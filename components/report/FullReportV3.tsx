
import { UserData, NumerologyResult } from '@/lib/types';
import { NameData } from '@/lib/numerology/db_etymology';
import Part1IntroV2 from './parts/Part1IntroV2';
import PartArchitecture from './parts/PartArchitecture';

interface FullReportProps {
  userData: UserData;
  results: NumerologyResult;
  etymology?: NameData | null;
}

export default function FullReportV3({ userData, results, etymology }: FullReportProps) {
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-[#fffbf0] text-[#44403c] shadow-2xl print:shadow-none font-sans">
      <Part1IntroV2 userData={userData} results={results} />
      <PartArchitecture userData={userData} results={results} />
      <div className="text-center p-8 text-xs text-stone-400 print:block hidden">
        Généré le {new Date().toLocaleDateString()} - Version 3.0 (Architecture de l'Âme)
      </div>
    </div>
  );
}
