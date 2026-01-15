
import { UserData, NumerologyResult } from '@/lib/types';
import Part1Intro from './parts/Part1Intro';
import Part2Incarnation from './parts/Part2Incarnation';
import Part3Karma from './parts/Part3Karma';
import Part4Focus from './parts/Part4Focus';
import Part5Future from './parts/Part5Future';
import Part6Integration from './parts/Part6Integration';

interface FullReportProps {
  userData: UserData;
  results: NumerologyResult;
}

export default function FullReport({ userData, results }: FullReportProps) {
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-[#1c1917] text-[#fdfbf7] shadow-2xl print:shadow-none">
      <Part1Intro userData={userData} results={results} />
      <Part2Incarnation userData={userData} results={results} />
      <Part3Karma userData={userData} results={results} />
      <Part4Focus userData={userData} results={results} />
      <Part5Future userData={userData} results={results} />
      <Part6Integration userData={userData} results={results} />
    </div>
  );
}
