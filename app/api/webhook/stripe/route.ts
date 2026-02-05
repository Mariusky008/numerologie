import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { EmailReport, EmailConfirmation, EmailMiroirIntegral } from '@/components/emails/Templates';
import { createClient } from '@supabase/supabase-js';

// Configuration Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

// Configuration Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Configuration Supabase Admin
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Secret de signature Webhook (à récupérer dans le dashboard Stripe)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    if (!endpointSecret) throw new Error('Webhook secret not found');
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Gestion de l'événement de paiement réussi
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    
    // Récupération des métadonnées stockées lors de la création de session
    const { orderId, plan, type } = session.metadata || {};
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || 'Cher Client';
    const firstName = customerName.split(' ')[0];

    // Liens (à adapter avec votre vrai domaine en prod)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    try {
      // 1. MISE À JOUR DU STATUT DANS SUPABASE (Indispensable pour l'admin)
      if (supabaseUrl && supabaseKey && orderId) {
        const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
        
        // On met le statut à 'paid' pour indiquer que le paiement est validé
        // NOTE: Puisque l'ID Stripe (metadata.orderId) est un custom ID (PM-...) stocké dans user_data->orderId,
        // et non la clé primaire UUID, on doit chercher dans le JSONB.
        
        // 1. Essai update par ID (si UUID)
        let { error: updateError, data } = await supabaseAdmin
          .from('book_requests')
          .update({ status: 'paid' })
          .eq('id', orderId)
          .select();
          
        // 2. Si pas trouvé (car c'est un ID custom PM-...), chercher dans user_data
        if (!data || data.length === 0) {
           const { error: jsonError } = await supabaseAdmin
            .from('book_requests')
            .update({ status: 'paid' })
            .eq('user_data->>orderId', orderId); // Syntaxe JSONB arrow
            
           if (jsonError) updateError = jsonError;
        }
          
        if (updateError) console.error('Erreur update status Supabase:', updateError);
        else {
          console.log(`Commande ${orderId} marquée comme payée.`);
          
          // 2. INC RÉMENTATION DES STATISTIQUES DE VENTE
          try {
            await supabaseAdmin.rpc('increment_stat', { event_name_input: 'report_purchase' });
          } catch (statError) {
            console.error('Erreur incrémentation stat:', statError);
          }
        }
      }

      // CAS 1: UPGRADE ROMAN (Achat du livre seul après coup)
      if (type === 'book_upgrade') {
        // 1. Mettre à jour la base de données pour dire "Livre inclus"
        if (supabaseUrl && supabaseKey) {
           const supabaseAdmin = createClient(supabaseUrl, supabaseKey);
           
           // On récupère d'abord les infos actuelles pour ne pas écraser
           const { data: existingOrder } = await supabaseAdmin
             .from('book_requests')
             .select('user_data')
             .eq('id', orderId)
             .single();
             
           if (existingOrder) {
             const updatedUserData = {
               ...existingOrder.user_data,
               plan: 'bundle', // Upgrade to bundle equivalent
               includeBook: true
             };
             
             await supabaseAdmin
               .from('book_requests')
               .update({ user_data: updatedUserData })
               .eq('id', orderId);
           }
        }

        // 2. Envoyer mail de confirmation spécifique
        await resend.emails.send({
          from: 'Votre Légende <contact@votrelegende.fr>',
          to: [customerEmail!],
          subject: 'Votre Roman est commandé ! 📖',
          react: EmailConfirmation({
            firstName,
            // On pourrait ajouter un message spécifique "Upgrade" dans le template si besoin
          }),
        });

        console.log(`Upgrade Roman traité pour la commande ${orderId}`);
        return NextResponse.json({ received: true });
      }

      // CAS 2: ACHAT CLASSIQUE
      if (plan === 'report') {
        // Envoi Email Rapport Seul (Immédiat car pas de vidéo)
        await resend.emails.send({
          from: 'Votre Légende <contact@votrelegende.fr>',
          to: [customerEmail!],
          subject: 'Votre Dossier Numérologique est prêt 🌟',
          react: EmailReport({
            firstName,
            downloadLink: `${baseUrl}/pdf-report-v2?order_id=${orderId}`,
            isPaper: false,
          }),
        });
      } else if (plan === 'bundle') {
        // NOUVEAU: Envoi immédiat pour le Pack Miroir Intégral (49€)
        await resend.emails.send({
          from: 'Votre Légende <contact@votrelegende.fr>',
          to: [customerEmail!],
          subject: 'Accès immédiat : Votre Miroir Intégral est prêt ✨',
          react: EmailMiroirIntegral({
            firstName,
            reportLink: `${baseUrl}/pdf-report-v2?order_id=${orderId}`,
            coachLink: `${baseUrl}/coach?id=${orderId}&name=${encodeURIComponent(firstName)}`,
          }),
        });
      } else {
        // Autres plans (si existants)
        await resend.emails.send({
          from: 'Votre Légende <contact@votrelegende.fr>',
          to: [customerEmail!],
          subject: 'Votre commande est confirmée ✅',
          react: EmailConfirmation({
            firstName,
          }),
        });
      }

      console.log(`Email envoyé avec succès pour la commande ${orderId}`);
      
    } catch (error) {
      console.error('Erreur envoi email:', error);
    }
  }

  return NextResponse.json({ received: true });
}