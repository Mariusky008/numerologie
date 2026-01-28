import { NextResponse } from 'next/server';
import { calculateProfile, calculateGaps, calculateIndices } from '@/lib/psy-mirror/engine';
import { generateNarrative } from '@/lib/psy-mirror/narrative';
import { Option } from '@/lib/psy-mirror/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { moduleA_answers, moduleB_answers, moduleC_results, user_meta } = body;

    // 1. Calculate Profiles
    const selfProfile = calculateProfile(moduleA_answers as Option[]);
    const behaviorProfile = calculateProfile(moduleB_answers as Option[]);

    // 2. Analyze Gaps
    const { gaps, primaryGap, secondaryGap } = calculateGaps(selfProfile, behaviorProfile);

    // 3. Derived Indices
    const indices = calculateIndices(moduleB_answers as Option[], behaviorProfile);

    // 4. Generate Content
    const narrative = generateNarrative(
      selfProfile, 
      behaviorProfile, 
      gaps, 
      primaryGap, 
      indices,
      moduleC_results
    );

    // 5. Build Final Result
    const result = {
      user_meta,
      self_profile: selfProfile,
      behavior_profile: behaviorProfile,
      gaps,
      primary_gap: primaryGap,
      secondary_gap: secondaryGap,
      indices,
      reflex_results: moduleC_results,
      ...narrative
    };

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Psy Mirror Engine Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
