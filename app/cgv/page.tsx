import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CGV() {
  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#2C2F4A] font-sans py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#5B4B8A] hover:text-[#6A5FA8] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-serif text-[#2C2F4A] mb-8">Conditions Générales de Vente (CGV)</h1>
        
        <div className="prose prose-stone max-w-none text-[#2C2F4A]/80">
          <p className="text-sm text-[#8FA6A0] mb-8">Dernière mise à jour : {new Date().toLocaleDateString()}</p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">1. Préambule</h2>
          <p>
            Les présentes conditions générales de vente s'appliquent à toutes les ventes conclues sur le site internet "Roman de Vie".
          </p>
          <p>
            Le site propose les produits suivants : 
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Rapports numérologiques (format numérique)</li>
              <li>Livres personnalisés "Roman de Vie" (format numérique ou physique)</li>
            </ul>
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">2. Prix</h2>
          <p>
            Les prix de nos produits sont indiqués en euros toutes taxes comprises (TTC). Toutes les commandes quelle que soit leur origine sont payables en euros.
          </p>
          <p>
            "Roman de Vie" se réserve le droit de modifier ses prix à tout moment, mais le produit sera facturé sur la base du tarif en vigueur au moment de la validation de la commande.
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">3. Commandes</h2>
          <p>
            Vous pouvez passer commande sur Internet via notre site. Les informations contractuelles sont présentées en langue française et feront l'objet d'une confirmation au plus tard au moment de la validation de votre commande.
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">4. Validation de votre commande</h2>
          <p>
            Toute commande figurant sur le site Internet suppose l'adhésion aux présentes Conditions Générales. Toute confirmation de commande entraîne votre adhésion pleine et entière aux présentes conditions générales de vente, sans exception ni réserve.
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">5. Paiement</h2>
          <p>
            Le fait de valider votre commande implique pour vous l'obligation de payer le prix indiqué. Le règlement de vos achats s'effectue par carte bancaire grâce au système sécurisé Stripe.
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">6. Rétractation</h2>
          <p className="bg-[#EFEDE9] p-4 rounded-lg border-l-4 border-[#C9A24D]">
            <strong>Exception au droit de rétractation :</strong> Conformément aux dispositions de l'article L.221-28 du Code de la Consommation, le droit de rétractation ne s'applique pas à :
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>La fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.</li>
              <li>La fourniture de biens confectionnés selon les spécifications du consommateur ou nettement personnalisés (ce qui est le cas de nos Romans de Vie basés sur vos données personnelles).</li>
            </ul>
            Par conséquent, aucun remboursement ne pourra être effectué une fois le processus de génération du rapport ou du livre entamé.
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">7. Livraison</h2>
          <p>
            Les produits numériques sont livrés à l'adresse email indiquée au cours du processus de commande ou accessibles directement sur le site via un lien de téléchargement. Le délai de livraison des produits numériques est généralement instantané ou de quelques minutes après validation du paiement.
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">8. Garantie</h2>
          <p>
            Tous nos produits bénéficient de la garantie légale de conformité et de la garantie des vices cachés, prévues par les articles 1641 et suivants du Code civil.
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">9. Responsabilité</h2>
          <p>
            Les produits proposés sont conformes à la législation française en vigueur. La responsabilité de "Roman de Vie" ne saurait être engagée en cas de non-respect de la législation du pays où le produit est livré.
          </p>
          <p>
            Par ailleurs, "Roman de Vie" ne saurait être tenu pour responsable des dommages résultant d'une mauvaise utilisation du produit acheté.
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">10. Droit applicable en cas de litiges</h2>
          <p>
            La langue du présent contrat est la langue française. Les présentes conditions de vente sont soumises à la loi française. En cas de litige, les tribunaux français seront les seuls compétents.
          </p>
        </div>
      </div>
    </div>
  );
}
