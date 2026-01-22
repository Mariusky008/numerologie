import { Resend } from 'resend';
import { EmailDeliverables } from '@/components/emails/Templates';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, firstName, videoUrl, requestId } = await req.json();

    if (!email || !firstName || !videoUrl || !requestId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Construction des liens
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.votrelegende.fr';
    const coachLink = `${baseUrl}/coach?id=${requestId}&name=${encodeURIComponent(firstName)}`;
    const reportLink = `${baseUrl}/pdf-report-v2?order_id=${requestId}`;

    const { data, error } = await resend.emails.send({
      from: 'Votre Légende <contact@roman-de-vie.com>',
      to: [email],
      subject: '✨ Votre Pack Révélation est prêt (Vidéo + Rapport)',
      react: EmailDeliverables({
        firstName,
        videoLink: videoUrl,
        reportLink,
        coachLink,
      }),
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
