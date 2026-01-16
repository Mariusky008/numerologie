import React from 'react';

export default function CGV() {
  return (
    <div className="prose prose-stone prose-headings:font-serif prose-headings:text-[#78350f] prose-a:text-[#d97706] max-w-none">
      <h1>Conditions Générales de Vente (CGV)</h1>
      <p className="text-sm text-stone-500">Dernière mise à jour : {new Date().toLocaleDateString()}</p>

      <h2>1. Préambule</h2>
      <p>
        Les présentes Conditions Générales de Vente (CGV) s'appliquent à toutes les commandes passées sur le site <strong>Numerologie.app</strong> pour l'achat de rapports de numérologie détaillés.
      </p>

      <h2>2. Prix</h2>
      <p>
        Les prix de nos produits sont indiqués en euros toutes taxes comprises (TTC). Le site se réserve le droit de modifier ses prix à tout moment, mais le produit sera facturé sur la base du tarif en vigueur au moment de la validation de la commande.
      </p>

      <h2>3. Commandes</h2>
      <p>
        La validation de la commande entraîne l'acceptation des présentes Conditions Générales de Vente. Les données enregistrées par le site constituent la preuve de l'ensemble des transactions passées entre le site et ses clients.
      </p>

      <h2>4. Modalités de paiement</h2>
      <p>
        Le règlement de vos achats s'effectue par carte bancaire grâce au système sécurisé [Stripe/PayPal]. Le débit de la carte est effectué au moment de la validation de la commande.
      </p>

      <h2>5. Livraison</h2>
      <p>
        Les produits achetés (rapports PDF ou accès numérique) sont livrés immédiatement par voie électronique à l'adresse email indiquée au cours du processus de commande ou directement accessibles sur le site après paiement.
      </p>

      <h2>6. Rétractation</h2>
      <p>
        Conformément aux dispositions de l'article L.121-21-8 du Code de la Consommation, le droit de rétractation ne s'applique pas à la fourniture d'un contenu numérique non fourni sur un support matériel dont l'exécution a commencé après accord préalable exprès du consommateur et renoncement exprès à son droit de rétractation.
      </p>
      <p>
        En validant sa commande de rapport numérique, le client accepte que l'exécution du service commence immédiatement et renonce expressément à son droit de rétractation.
      </p>

      <h2>7. Garantie de satisfaction</h2>
      <p>
        Bien que le droit de rétractation légal ne s'applique pas, nous nous engageons à étudier toute réclamation justifiée en cas de problème technique ou de non-réception du produit commandé. Contactez notre support à contact@numerologie.app.
      </p>
    </div>
  );
}
