
import { ReactNode } from 'react';

export default function PageContainer({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={`w-full min-h-screen md:min-h-[297mm] print:h-auto print:min-h-0 relative bg-[#FAF9F7] text-[#2C2F4A] overflow-hidden print:overflow-visible flex flex-col ${className}`}>
      {children}
      {/* Decorative Border for all pages */}
      <div className="absolute inset-0 border-[12px] border-[#FAF9F7] pointer-events-none z-10 hidden md:block print:hidden" />
      <div className="absolute inset-4 border border-[#C9A24D]/20 pointer-events-none z-10 hidden md:block print:hidden" />
    </div>
  );
}
