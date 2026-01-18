
import { UserData, NumerologyResult } from '@/lib/types';
import { NameData } from '@/lib/numerology/db_etymology';
import Part1IntroV2 from './parts/Part1IntroV2';
import Part1Identity from './parts/Part1Identity';
import PartAstroV2 from './parts/PartAstroV2';
import Part2Incarnation from './parts/Part2Incarnation';
import Part3KarmaV2 from './parts/Part3KarmaV2';
import Part4Focus from './parts/Part4Focus';
import Part5Future from './parts/Part5Future';
import Part6Integration from './parts/Part6Integration';

interface FullReportProps {
  userData: UserData;
  results: NumerologyResult;
  etymology?: NameData | null;
}

export default function FullReportV2({ userData, results, etymology }: FullReportProps) {
  return (
    <div className="w-full max-w-[210mm] mx-auto bg-[#fffbf0] text-[#44403c] shadow-2xl print:shadow-none font-sans">
      <Part1IntroV2 userData={userData} results={results} />
      <Part1Identity userData={userData} results={results} />
      <Part2Incarnation userData={userData} results={results} />
      <PartAstroV2 userData={userData} results={results} etymology={etymology} />
      <Part3KarmaV2 userData={userData} results={results} />
      <Part4Focus userData={userData} results={results} />
      <Part5Future userData={userData} results={results} />
      <Part6Integration userData={userData} results={results} />
      <div className="text-center p-8 text-xs text-stone-400 print:block hidden">
        Généré le {new Date().toLocaleDateString()} - Version 2.2 (Préambule V2)
      </div>
    </div>
  );
}
