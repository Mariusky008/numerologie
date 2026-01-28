import React from 'react';
import PsyMirrorLanding from '@/components/landing/PsyMirrorLanding';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Miroir Psychologique | Compréhension Comportementale',
  description: 'Découvrez l’écart entre ce que vous pensez être et ce que votre comportement révèle vraiment.',
};

export default function MiroirPage() {
  return <PsyMirrorLanding />;
}
