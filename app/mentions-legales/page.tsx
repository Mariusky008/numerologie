import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#2C2F4A] font-sans py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#5B4B8A] hover:text-[#6A5FA8] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-serif text-[#2C2F4A] mb-8">Mentions Légales</h1>
        
        <div className="prose prose-stone max-w-none text-[#2C2F4A]/80">
          <p className="text-sm text-[#8FA6A0] mb-8">Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site Roman de Vie l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.</p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">1. Édition du site</h2>
          <p>
            Le présent site, accessible à l’URL www.romandevie.com (le « Site »), est édité par :
          </p>
          <p className="mt-2">
            <strong>Jean-Philippe [NOM]</strong><br />
            Résidant au [ADRESSE COMPLETE]<br />
            De nationalité Française (France)<br />
            Né(e) le [DATE DE NAISSANCE]
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">2. Hébergement</h2>
          <p>
            Le Site est hébergé par la société Vercel Inc., située 340 S Lemon Ave #4133 Walnut, CA 91789, (contact téléphonique ou email : https://vercel.com/contact).
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">3. Directeur de publication</h2>
          <p>
            Le Directeur de la publication du Site est Jean-Philippe [NOM].
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">4. Nous contacter</h2>
          <p>
            Par email : contact@romandevie.com<br />
            Par courrier : [ADRESSE POSTALE]
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">5. Données personnelles</h2>
          <p>
            Le traitement de vos données à caractère personnel est régi par notre Charte du respect de la vie privée, disponible depuis la section "Charte de Protection des Données Personnelles", conformément au Règlement Général sur la Protection des Données 2016/679 du 27 avril 2016 («RGPD»).
          </p>
        </div>
      </div>
    </div>
  );
}
