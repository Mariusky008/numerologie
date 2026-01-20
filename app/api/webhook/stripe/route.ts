import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';
import { EmailReport, EmailBundle } from '@/components/emails/Templates';

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
    const { orderId, plan, bookLength } = session.metadata || {};
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || 'Cher Client';

    // Détermination des options
    const isPaper = session.amount_total! >= 3900; // Simplification (à affiner selon vos prix exacts si besoin)
    
    // Liens (à adapter avec votre vrai domaine en prod)
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    // Paramètres pour regénérer les liens
    // Note: Dans un vrai système, on récupérerait ces infos de la DB via orderId
    // Ici on simplifie pour l'exemple
    
    try {
      if (plan === 'report') {
        // Envoi Email Rapport Seul
        await resend.emails.send({
          from: 'Votre Légende <contact@votrelegende.fr>', // Remplacez par votre domaine vérifié Resend
          to: [customerEmail!],
          subject: 'Votre Dossier Numérologique est prêt 🌟',
          react: EmailReport({
            firstName: customerName.split(' ')[0],
            downloadLink: `${baseUrl}/pdf-report-v2?order_id=${orderId}`, // Lien direct vers le PDF
            isPaper: isPaper,
          }),
        });
      } else if (plan === 'bundle') {
        // Envoi Email Bundle (Livre)
        await resend.emails.send({
          from: 'Votre Légende <contact@votrelegende.fr>',
          to: [customerEmail!],
          subject: 'Commencez l\'écriture de votre Légende 📖',
          react: EmailBundle({
            firstName: customerName.split(' ')[0],
            writeLink: `${baseUrl}/book-setup?order_id=${orderId}`, // Nouvelle page à créer pour configurer le livre
            downloadLink: `${baseUrl}/pdf-report-v2?order_id=${orderId}`,
            isPaper: isPaper,
          }),
        });
      }

      console.log(`Email envoyé avec succès pour la commande ${orderId}`);
      
    } catch (error) {
      console.error('Erreur envoi email:', error);
      // On ne renvoie pas d'erreur 500 à Stripe pour éviter qu'il ne re-tente indéfiniment le webhook
      // Mais on loggue l'erreur pour intervention manuelle
    }
  }

  return NextResponse.json({ received: true });
}