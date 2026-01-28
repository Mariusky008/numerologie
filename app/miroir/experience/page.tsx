import React from 'react';
import ExperiencePsyMirror from '@/components/experience/ExperiencePsyMirror';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Expérience | Miroir Psychologique',
  description: 'Commencez votre analyse comportementale et découvrez votre reflet psychologique.',
};

export default function ExperiencePage() {
  return <ExperiencePsyMirror />;
}
