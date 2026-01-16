import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="prose prose-stone prose-headings:font-serif prose-headings:text-[#78350f] prose-a:text-[#d97706] max-w-none">
      <h1>Politique de Confidentialité</h1>
      <p className="text-sm text-stone-500">Dernière mise à jour : {new Date().toLocaleDateString()}</p>

      <p>
        Nous accordons une importance capitale à la confidentialité de vos données. Cette politique détaille comment nous collectons, utilisons et protégeons vos informations personnelles.
      </p>

      <h2>1. Données collectées</h2>
      <p>
        Pour générer votre rapport de numérologie, nous collectons les informations suivantes :
      </p>
      <ul>
        <li>Nom de naissance et prénoms (pour le calcul du Chemin de Vie, Nombre d'Expression, etc.)</li>
        <li>Date de naissance (pour le calcul des cycles temporels)</li>
        <li>Adresse email (pour l'envoi du rapport et la création de compte)</li>
      </ul>

      <h2>2. Utilisation des données</h2>
      <p>
        Vos données sont utilisées exclusivement pour :
      </p>
      <ul>
        <li>Générer vos analyses numérologiques personnalisées.</li>
        <li>Vous envoyer votre rapport par email.</li>
        <li>Améliorer nos méthodes de calcul (données anonymisées).</li>
      </ul>
      <p>
        <strong>Nous ne revendons jamais vos données personnelles à des tiers.</strong>
      </p>

      <h2>3. Sécurité des données</h2>
      <p>
        Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction. Toutes les transactions de paiement sont sécurisées et cryptées (SSL).
      </p>

      <h2>4. Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Vous pouvez exercer ce droit à tout moment en nous contactant à contact@numerologie.app ou via votre espace personnel.
      </p>

      <h2>5. Durée de conservation</h2>
      <p>
        Vos données de profil sont conservées tant que votre compte est actif. En cas d'inactivité prolongée (plus de 3 ans), elles seront automatiquement supprimées.
      </p>
    </div>
  );
}
