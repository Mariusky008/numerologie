import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { EmailReport, EmailConfirmation } from '@/components/emails/Templates';

// Configuration Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

// Configuration Resend
const resend = new Resend(process.env.RESEND_API_KEY);

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
      // CAS 1: UPGRADE ROMAN (Achat du livre seul après coup)
      if (type === 'book_upgrade') {
        // 1. Mettre à jour la base de données pour dire "Livre inclus"
        // Note: Ici on suppose que vous avez accès à supabase pour update.
        // Comme supabase n'est pas importé ici (dans ce snippet), on va supposer que l'admin verra la commande Stripe.
        // MAIS pour bien faire, il faudrait update la ligne 'book_requests'.
        
        // Import dynamique pour éviter les soucis si supabase n'est pas utilisé ailleurs ?
        // Non, on va l'importer en haut.
        
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

        // 3. (Optionnel) Update Supabase ici si on avait le client
        // Voir import supabase en haut
        const { createClient } = require('@supabase/supabase-js');
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Utiliser la clé service pour écrire
        
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
      } else {
        // Pour le Bundle (Vidéo + Rapport + Chat) ou tout autre plan
        // On envoie d'abord une confirmation de commande "En traitement"
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