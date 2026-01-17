
'use client';

import { useState } from 'react';
import LandingPageHero from '@/components/landing/LandingPageHero';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import ReportView from '@/components/report/ReportView';
import { UserData } from '@/lib/types';

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <main className="min-h-screen bg-[#fffbf0] text-[#57534e]">
      {!hasStarted ? (
        <LandingPageHero onStart={() => setHasStarted(true)} />
      ) : !userData ? (
        <OnboardingFlow onComplete={setUserData} />
      ) : (
        <ReportView userData={userData} />
      )}
    </main>
  );
}
