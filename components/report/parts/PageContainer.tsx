
import { ReactNode } from 'react';

export default function PageContainer({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={`w-full h-[297mm] relative bg-[#1c1917] text-[#fdfbf7] overflow-hidden flex flex-col ${className}`}>
      {children}
      {/* Decorative Border for all pages */}
      <div className="absolute inset-0 border-[12px] border-[#1c1917] pointer-events-none z-10" />
      <div className="absolute inset-4 border border-[#fbbf24]/20 pointer-events-none z-10" />
    </div>
  );
}
