import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderInfo, userData, orderId } = body;

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is missing in env");
      return NextResponse.json(
        { error: "La clé Stripe n'est pas configurée sur le serveur." },
        { status: 500 }
      );
    }

    // Initialisation de Stripe uniquement si la clé est présente et au moment de la requête
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      typescript: true,
    });

    // Calcul du prix côté serveur pour sécurité
    let unitAmount = 0;
    let productName = "";
    let description = "";

    if (orderInfo.plan === 'report') {
      productName = "Clés de Votre Destin (Analyse Technique)";
      unitAmount = 3900; // 39.00€
      description = "Dossier Numérologique Essentiel (PDF)";

      if (orderInfo.reportPaperOption) {
        unitAmount += 1000; // +10.00€
        description += " + Option Impression Papier";
      }
    } else if (orderInfo.plan === 'bundle') {
      productName = "Pack Héros (Roman de Vie + Dossier)";
      unitAmount = 4900; // 49.00€
      description = "Expérience Complète : Roman + Analyse";

      // Option Papier
      if (orderInfo.paperOption) {
        unitAmount += 2900; // +29.00€
        description += " + Livre Papier Luxe";
      }

      // Extension de pages
      if (orderInfo.bookLength && orderInfo.bookLength > 100) {
        const extraPages = (orderInfo.bookLength - 100) / 100;
        unitAmount += extraPages * 1000; // +10€ par tranche de 100 pages
        description += ` + Extension ${orderInfo.bookLength} pages`;
      }
    }

      // URL de succès modifiée pour rediriger vers la nouvelle page de remerciement
      const successParams = new URLSearchParams({
        plan: orderInfo.plan,
        paper: (orderInfo.paperOption || orderInfo.reportPaperOption) ? 'true' : 'false',
        email: orderInfo.delivery?.email || '',
        fn: userData.firstName,
        order_id: orderId || ''
      });

    // URL de base (en dev ou prod)
    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // Création de la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: productName,
              description: description,
              // images: ['https://votre-site.com/images/book-cover.jpg'], // Optionnel
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?${successParams.toString()}`,
      cancel_url: `${origin}/checkout?fn=${userData.firstName}&ln=${userData.lastName}&bd=${userData.birthDate}`,
      client_reference_id: orderId,
      customer_email: orderInfo.delivery?.email,
      metadata: {
        orderId: orderId,
        plan: orderInfo.plan,
        bookLength: orderInfo.bookLength?.toString() || '100',
      },
    });

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error('Erreur Stripe:', error);
    return NextResponse.json(
      { error: `Erreur lors de la création de la session de paiement: ${error?.message || 'Inconnue'}` },
      { status: 500 }
    );
  }
}
