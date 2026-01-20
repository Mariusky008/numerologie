import React from 'react';

export default function CGU() {
  return (
    <div className="prose prose-stone prose-headings:font-serif prose-headings:text-[#78350f] prose-a:text-[#d97706] max-w-none">
      <h1>Conditions Générales d'Utilisation (CGU)</h1>
      <p className="text-sm text-stone-500">Dernière mise à jour : {new Date().toLocaleDateString()}</p>

      <h2>1. Objet</h2>
      <p>
        Les présentes Conditions Générales d'Utilisation ont pour objet de définir les modalités de mise à disposition des services du site <strong>Numerologie.app</strong>, ci-après nommé « le Service » et les conditions d'utilisation du Service par l'Utilisateur.
      </p>

      <h2>2. Accès au service</h2>
      <p>
        Le Service est accessible gratuitement à tout Utilisateur disposant d'un accès à internet. Tous les coûts afférents à l'accès au Service, que ce soit les frais matériels, logiciels ou d'accès à internet sont exclusivement à la charge de l'utilisateur. Il est seul responsable du bon fonctionnement de son équipement informatique ainsi que de son accès à internet.
      </p>

      <h2>3. Propriété intellectuelle</h2>
      <p>
        Les marques, logos, signes ainsi que tout le contenu du site (textes, images, son, méthode de calcul...) font l'objet d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.
      </p>
      <p>
        L'Utilisateur sollicite l'autorisation préalable du site pour toute reproduction, publication, copie des différents contenus. Il s'engage à une utilisation des contenus du site dans un cadre strictement privé, toute utilisation à des fins commerciales et publicitaires est strictement interdite.
      </p>

      <h2>4. Données personnelles</h2>
      <p>
        Les informations demandées à l’inscription au site sont nécessaires et obligatoires pour la création du compte de l'Utilisateur. En particulier, l'adresse email pourra être utilisée par le site pour l'administration, la gestion et l'animation du service.
      </p>
      <p>
        Le site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés.
      </p>

      <h2>5. Responsabilité</h2>
      <p>
        Les informations communiquées sont présentées à titre indicatif et général sans valeur contractuelle. Malgré des mises à jour régulières, le site ne peut être tenu responsable de la modification des dispositions administratives et juridiques survenant après la publication. De même, le site ne peut être tenue responsable de l'utilisation et de l'interprétation de l'information contenue dans ce site.
      </p>
      <p>
        <strong>Note importante :</strong> Les analyses de numérologie sont fournies à des fins de divertissement et de développement personnel. Elles ne sauraient se substituer à un avis médical, psychologique, légal ou financier professionnel.
      </p>

      <h2>6. Droit applicable et juridiction compétente</h2>
      <p>
        La législation française s'applique au présent contrat. En cas d'absence de résolution amiable d'un litige né entre les parties, les tribunaux français seront seuls compétents pour en connaître.
      </p>
    </div>
  );
}
