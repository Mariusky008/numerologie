import React from 'react';
import ResultPsyMirror from '@/components/experience/ResultPsyMirror';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Résultats | Miroir Psychologique',
  description: 'Consultez votre analyse comportementale complète et votre miroir psychologique.',
};

export default function ResultatPage() {
  return <ResultPsyMirror />;
}
