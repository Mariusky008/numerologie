
'use client';

import { useState, useEffect } from 'react';
import LandingPage from '../components/landing/LandingPage';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import ReportView from '@/components/report/ReportView';
import { UserData } from '@/lib/types';
import { trackEvent } from '@/lib/analytics';

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Track Home View on mount
    trackEvent('home_view');
  }, []);

  const handleStart = () => {
    trackEvent('reveal_click');
    setHasStarted(true);
  };

  return (
    <main className="min-h-screen bg-[#fffbf0] text-[#57534e]">
      {!hasStarted ? (
        <LandingPage onStart={handleStart} />
      ) : !userData ? (
        <OnboardingFlow onComplete={setUserData} />
      ) : (
        <ReportView userData={userData} />
      )}
    </main>
  );
}
