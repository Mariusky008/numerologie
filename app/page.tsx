
'use client';

import { useState } from 'react';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import ReportView from '@/components/report/ReportView';
import { UserData } from '@/lib/types';

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);

  return (
    <main className="min-h-screen bg-stone-900 text-cream-50">
      {!userData ? (
        <OnboardingFlow onComplete={setUserData} />
      ) : (
        <ReportView userData={userData} />
      )}
    </main>
  );
}
