
import { ReactNode } from 'react';

export default function PageContainer({ children, className = "" }: { children: ReactNode, className?: string }) {
  return (
    <div className={`w-full min-h-screen md:h-[297mm] relative bg-[#fffbf0] text-[#44403c] overflow-hidden flex flex-col ${className}`}>
      {children}
      {/* Decorative Border for all pages */}
      <div className="absolute inset-0 border-[12px] border-[#fffbf0] pointer-events-none z-10 hidden md:block" />
      <div className="absolute inset-4 border border-[#d97706]/20 pointer-events-none z-10 hidden md:block" />
    </div>
  );
}
