import React from 'react';
import PsyMirrorLanding from '@/components/landing/PsyMirrorLanding';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Le Crash-Test de tes Décisions | Miroir Psychologique',
  description: 'Compare ton potentiel de naissance aux décisions et aux choix que tu fais réellement.',
};

export default function MiroirPage() {
  return <PsyMirrorLanding />;
}
