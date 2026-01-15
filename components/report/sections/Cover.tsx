
export default function Cover({ firstName, lastName }: { firstName: string; lastName: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-12 text-center border-b border-stone-800 bg-stone-900">
      <h1 className="text-6xl md:text-8xl font-serif text-amber-100 mb-8">
        {firstName} <br />
        <span className="text-amber-500">{lastName}</span>
      </h1>
      <div className="w-32 h-1 bg-amber-500/50 mx-auto mb-8" />
      <h2 className="text-2xl md:text-3xl font-light tracking-[0.3em] text-amber-100/80 uppercase">
        Étude Numérologique
      </h2>
      <p className="mt-4 text-xl text-amber-200/60 italic font-serif">Lecture d'Âme & Alignement</p>
    </div>
  );
}
