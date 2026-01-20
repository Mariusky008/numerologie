'use client';

import { useState } from 'react';
import LandingPageStarry from '@/components/landing/LandingPageStarry';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import ReportView from '@/components/report/ReportView';
import { UserData } from '@/lib/types';

export default function StarryPage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <main>
      {!hasStarted ? (
        <LandingPageStarry onStart={() => setHasStarted(true)} />
      ) : !userData ? (
        <OnboardingFlow onComplete={setUserData} />
      ) : (
        <ReportView userData={userData} />
      )}
    </main>
  );
}
