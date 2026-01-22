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

    // NOUVELLE LOGIQUE UNIQUE : PACK RÉVÉLATION
    if (orderInfo.plan === 'bundle') {
      productName = "Le Pack Révélation (Complet)";
      unitAmount = 2900; // 29.00€
      description = "Vidéo Avatar (5 min) + Dossier PDF (40 pages) + Coach IA (30 min)";
      
      // On ignore les anciennes options pour l'instant pour éviter les erreurs de calcul
    } 
    // BACKWARD COMPATIBILITY (au cas où d'anciens liens traînent)
    else if (orderInfo.plan === 'report') {
      productName = "Dossier Numérologique (PDF)";
      unitAmount = 2900; // Alignement sur le prix unique
      description = "Dossier PDF + Bonus";
    } else {
       // Fallback par défaut
      productName = "Pack Révélation";
      unitAmount = 2900;
      description = "Offre complète";
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
