import React from 'react';
import ExperiencePsyMirror from '@/components/experience/ExperiencePsyMirror';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Le Crash-Test | Miroir Psychologique',
  description: 'Commence ton Crash-Test et compare ton potentiel à tes choix réels.',
};

export default function ExperiencePage() {
  return <ExperiencePsyMirror />;
}
