
import { ReactNode } from 'react';

export default function PageContainer({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={`w-full min-h-screen md:min-h-[297mm] print:h-auto print:min-h-0 relative bg-[#fffbf0] text-[#44403c] overflow-hidden print:overflow-visible flex flex-col ${className}`}>
      {children}
      {/* Decorative Border for all pages */}
      <div className="absolute inset-0 border-[12px] border-[#fffbf0] pointer-events-none z-10 hidden md:block print:hidden" />
      <div className="absolute inset-4 border border-[#d97706]/20 pointer-events-none z-10 hidden md:block print:hidden" />
    </div>
  );
}
