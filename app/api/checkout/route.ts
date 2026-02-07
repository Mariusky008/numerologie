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

    // Calcul des produits (Server-side source of truth)

    // NOUVELLE LOGIQUE UNIQUE : PACK RÉVÉLATION
    const line_items = [];

    // Définition des plans et prix
    const plans: Record<string, { name: string, description: string, amount: number }> = {
      bundle: {
        name: "Le Pack Révélation (Complet)",
        description: "Analyse Vidéo Oracle (5 min) + Dossier PDF (40 pages) + Coach IA (30 min)",
        amount: 4900
      },
      'coach-30d': {
        name: "Coach IA - Accès 30 Jours",
        description: "Accès illimité à l'Assistant Numérologique IA pendant 30 jours.",
        amount: 1400
      },
      parcours_autonome: {
        name: "Parcours 3 Mois - Autonome",
        description: "Accès complet aux 3 cycles mensuels d'exploration pendant 3 mois.",
        amount: 49900
      },
      parcours_mensuel: {
        name: "Parcours 3 Mois + Coach Mensuel",
        description: "Parcours complet + 1 session individuelle de 1 heure par mois.",
        amount: 159900
      },
      parcours_hebdo: {
        name: "Parcours 3 Mois + Coach Hebdo",
        description: "Parcours complet + 1 session individuelle de 1 heure par semaine.",
        amount: 299900
      }
    };

    const selectedPlan = plans[orderInfo.plan] || plans.bundle;

    // 1. LE PACK SÉLECTIONNÉ
    line_items.push({
      price_data: {
        currency: 'eur',
        product_data: {
          name: selectedPlan.name,
          description: selectedPlan.description,
        },
        unit_amount: selectedPlan.amount,
      },
      quantity: 1,
    });

    // 2. OPTION LIVRE (Si cochée - Uniquement pour le pack bundle)
    if (orderInfo.plan === 'bundle' && orderInfo.includeBook) {
      line_items.push({
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Option : Le Roman de Votre Vie (PDF)',
            description: 'Biographie romancée de 100 pages basée sur votre numérologie.',
          },
          unit_amount: 4900, // +49.00€
        },
        quantity: 1,
      });
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
      line_items: line_items,
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
