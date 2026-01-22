import { Resend } from 'resend';
import { EmailVideo } from '@/components/emails/Templates';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, firstName, videoUrl } = await req.json();

    if (!email || !firstName || !videoUrl) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Votre Légende <contact@roman-de-vie.com>', // Update with your verified domain
      to: [email],
      subject: '🎥 Votre vidéo numérologique est prête !',
      react: EmailVideo({
        firstName,
        downloadLink: videoUrl,
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
