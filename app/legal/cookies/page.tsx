import React from 'react';

export default function CookiesPolicy() {
  return (
    <div className="prose prose-stone prose-headings:font-serif prose-headings:text-[#78350f] prose-a:text-[#d97706] max-w-none">
      <h1>Gestion des Cookies</h1>
      <p className="text-sm text-stone-500">Dernière mise à jour : {new Date().toLocaleDateString()}</p>

      <h2>1. Qu'est-ce qu'un cookie ?</h2>
      <p>
        Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette ou mobile) lors de la visite d'un site internet. Il permet au site de mémoriser vos actions et préférences (nom d'utilisateur, langue, taille des caractères et autres paramètres d'affichage) pendant un temps donné.
      </p>

      <h2>2. Les cookies que nous utilisons</h2>
      <h3>Cookies strictement nécessaires</h3>
      <p>
        Ces cookies sont indispensables au bon fonctionnement du site (ex: mémorisation de votre session, sécurisation du paiement). Ils ne peuvent pas être désactivés.
      </p>

      <h3>Cookies de mesure d'audience</h3>
      <p>
        Nous utilisons des outils d'analyse (comme Google Analytics ou Plausible) pour comprendre comment nos visiteurs utilisent le site et améliorer l'expérience utilisateur. Ces données sont anonymisées.
      </p>

      <h2>3. Gestion de vos préférences</h2>
      <p>
        Vous pouvez à tout moment choisir de désactiver tout ou partie des cookies via les paramètres de votre navigateur. Cependant, votre expérience utilisateur risque d'être dégradée (impossibilité de se connecter, perte du panier, etc.).
      </p>
      
      <p>
        Pour plus d'informations sur les cookies et leur gestion, vous pouvez consulter le site de la CNIL : <a href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser" target="_blank" rel="noopener noreferrer">https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser</a>
      </p>
    </div>
  );
}
