import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, email, firstName } = body;

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Configuration Stripe manquante" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      typescript: true,
    });

    // URL de base
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // Création de la session Stripe spécifique pour l'upgrade
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Option : Le Roman de Votre Vie (PDF)',
              description: 'Biographie romancée de 100 pages basée sur votre numérologie (Upgrade).',
            },
            unit_amount: 2900, // 29.00€
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?upgrade=true&order_id=${orderId}&email=${email}&fn=${firstName}`,
      cancel_url: `${origin}/upgrade-book?orderId=${orderId}`, // Retour à la page d'upgrade si annulation
      client_reference_id: orderId,
      customer_email: email,
      metadata: {
        orderId: orderId,
        type: 'book_upgrade', // Marqueur important pour le webhook
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error('Erreur Stripe Upgrade:', error);
    return NextResponse.json(
      { error: error?.message || 'Erreur inconnue' },
      { status: 500 }
    );
  }
}