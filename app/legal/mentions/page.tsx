import React from 'react';

export default function MentionsLegales() {
  return (
    <div className="prose prose-stone prose-headings:font-serif prose-headings:text-[#78350f] prose-a:text-[#d97706] max-w-none">
      <h1>Mentions Légales</h1>
      <p className="text-sm text-stone-500">Dernière mise à jour : {new Date().toLocaleDateString()}</p>

      <h2>1. Éditeur du site</h2>
      <p>
        Le site <strong>Numerologie.app</strong> est édité par :<br />
        [Nom de la Société ou de l'Entrepreneur]<br />
        Statut juridique : [SAS / SARL / Auto-entrepreneur]<br />
        Siège social : [Adresse complète]<br />
        SIRET : [Numéro SIRET]<br />
        TVA Intracommunautaire : [Numéro TVA]<br />
        Email : contact@numerologie.app
      </p>

      <h2>2. Directeur de la publication</h2>
      <p>
        Directeur de la publication : [Nom du Responsable]
      </p>

      <h2>3. Hébergement</h2>
      <p>
        Le site est hébergé par :<br />
        <strong>Vercel Inc.</strong><br />
        340 S Lemon Ave #4133<br />
        Walnut, CA 91789<br />
        États-Unis<br />
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a>
      </p>

      <h2>4. Propriété intellectuelle</h2>
      <p>
        L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
      </p>
      <p>
        La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
      </p>

      <h2>5. Limitation de responsabilité</h2>
      <p>
        Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes. Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email.
      </p>
    </div>
  );
}
