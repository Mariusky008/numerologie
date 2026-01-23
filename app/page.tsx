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
  
  // Initialize state directly from URL if possible to avoid flash/race conditions
  const urlFn = searchParams.get('fn');
  const urlLn = searchParams.get('ln');
  const urlBd = searchParams.get('bd');
  
  const initialUserData = (urlFn && urlLn && urlBd) ? {
      firstName: urlFn,
      lastName: urlLn,
      birthDate: urlBd,
      birthPlace: searchParams.get('bp') || '',
      birthTime: '', 
      focus: (searchParams.get('fo') as any) || 'mission'
  } : null;

  const [hasStarted, setHasStarted] = useState(!!initialUserData);
  const [userData, setUserData] = useState<UserData | null>(initialUserData);

  useEffect(() => {
    // Track Home View on mount
    trackEvent('home_view');
    
    // If we just hydrated from URL, make sure state is consistent (double check)
    if (initialUserData && !hasStarted) {
        setHasStarted(true);
    }
  }, [searchParams]); // Remove initialUserData dep to avoid loop, though it's constant per render

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
