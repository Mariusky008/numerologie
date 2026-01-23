'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import LandingPageHero from '@/components/landing/LandingPageHero';
import OnboardingFlow from '@/components/onboarding/OnboardingFlow';
import ReportView from '@/components/report/ReportView';
import { UserData } from '@/lib/types';
import { trackEvent } from '@/lib/analytics';

function HomeContent() {
  const searchParams = useSearchParams();
  const [hasStarted, setHasStarted] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Track Home View on mount
    trackEvent('home_view');
    
    // Check for state restoration from URL (e.g. coming back from checkout)
    const fn = searchParams.get('fn');
    const ln = searchParams.get('ln');
    const bd = searchParams.get('bd');
    
    if (fn && ln && bd) {
        setUserData({
            firstName: fn,
            lastName: ln,
            birthDate: bd,
            birthPlace: searchParams.get('bp') || '',
            birthTime: '', // Not strictly needed for display restoration
            focus: (searchParams.get('fo') as any) || 'mission'
        });
        setHasStarted(true);
    }
  }, [searchParams]);

  const handleStart = () => {
    trackEvent('reveal_click');
    setHasStarted(true);
  };

  return (
    <main className="min-h-screen bg-[#FAF9F7] text-[#2C2F4A]">
      {!hasStarted ? (
        <LandingPageHero onStart={handleStart} />
      ) : !userData ? (
        <OnboardingFlow onComplete={setUserData} />
      ) : (
        <ReportView userData={userData} />
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  );
}
