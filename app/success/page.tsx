'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, Mail, Package, ArrowRight, BookOpen, Download } from 'lucide-react';
import { motion } from 'framer-motion';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const plan = searchParams.get('plan'); // 'report' or 'bundle'
  const paper = searchParams.get('paper') === 'true'; // 'true' or 'false'
  const email = searchParams.get('email');
  const firstName = searchParams.get('fn') || 'Cher client';

  // Déterminer le type de message à afficher selon les 8 hypothèses
  const isBundle = plan === 'bundle';
  const isPaper = paper;

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#2C2F4A] font-sans flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-[#EFEDE9] overflow-hidden relative">
        {/* Confetti / Decor */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#5B4B8A] to-[#C9A24D]"></div>
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-[#C9A24D]/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-[-50px] left-[-50px] w-32 h-32 bg-[#5B4B8A]/10 rounded-full blur-2xl"></div>

        <div className="p-8 md:p-12 text-center relative z-10">
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-serif text-[#2C2F4A] mb-4">
            Merci {firstName} !
          </h1>
          
          <p className="text-lg text-[#2C2F4A]/70 mb-8">
            Votre commande a bien été validée.
          </p>

          {/* MESSAGE DYNAMIQUE SELON L'ACHAT */}
          <div className="bg-[#FAF9F7] p-6 rounded-xl border border-[#EFEDE9] text-left space-y-4 mb-8">
            
            {/* Cas 1 & 2 : Rapport seul (PDF ou Papier) */}
            {!isBundle && (
              <div className="flex items-start gap-4">
                <div className="bg-[#5B4B8A]/10 p-2 rounded-lg">
                   <Download className="w-6 h-6 text-[#5B4B8A]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2C2F4A]">Votre Dossier Numérologique</h3>
                  <p className="text-sm text-[#2C2F4A]/70 mt-1">
                    Le rapport PDF complet a été envoyé à <strong>{email}</strong>.
                    Vérifiez vos spams si vous ne le voyez pas dans les 5 minutes.
                  </p>
                  {isPaper && (
                    <div className="mt-3 flex items-start gap-2 text-sm text-[#C9A24D] font-bold bg-[#C9A24D]/5 p-3 rounded-lg border border-[#C9A24D]/20">
                      <Package className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Votre version imprimée est en cours de préparation et arrivera bientôt par la poste.</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Cas 3 à 8 : Livre (Bundle) */}
            {isBundle && (
              <div className="flex items-start gap-4">
                <div className="bg-[#C9A24D]/10 p-2 rounded-lg">
                   <BookOpen className="w-6 h-6 text-[#C9A24D]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2C2F4A]">Votre Roman de Vie</h3>
                  <p className="text-sm text-[#2C2F4A]/70 mt-1">
                    Vous avez reçu un email à <strong>{email}</strong> contenant votre Dossier Essentiel (PDF) ainsi que le lien pour configurer votre Livre.
                  </p>
                  
                  {isPaper ? (
                     <div className="mt-3 flex items-start gap-2 text-sm text-[#C9A24D] font-bold bg-[#C9A24D]/5 p-3 rounded-lg border border-[#C9A24D]/20">
                      <Package className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>Une fois configuré, votre livre sera imprimé et expédié à votre adresse.</span>
                    </div>
                  ) : (
                    <div className="mt-3 text-sm text-[#5B4B8A] bg-[#5B4B8A]/5 p-3 rounded-lg border border-[#5B4B8A]/10">
                      <span>Votre livre numérique sera généré dès que vous aurez complété les informations via le lien reçu.</span>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/')}
              className="px-6 py-3 rounded-full border border-[#EFEDE9] text-[#2C2F4A]/60 hover:bg-white hover:border-[#5B4B8A] hover:text-[#5B4B8A] transition-all font-medium text-sm"
            >
              Retour à l'accueil
            </button>
            <button 
              onClick={() => window.open('mailto:contact@votrelegende.fr')} // Remplacez par votre email
              className="px-6 py-3 rounded-full bg-[#2C2F4A] text-white hover:bg-[#5B4B8A] transition-all font-medium text-sm flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contacter le support
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <SuccessContent />
    </Suspense>
  );
}