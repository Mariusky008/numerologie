import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CGU() {
  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#2C2F4A] font-sans py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[#5B4B8A] hover:text-[#6A5FA8] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-serif text-[#2C2F4A] mb-8">Conditions Générales d'Utilisation (CGU)</h1>
        
        <div className="prose prose-stone max-w-none text-[#2C2F4A]/80">
          <p className="text-sm text-[#8FA6A0] mb-8">Dernière mise à jour : {new Date().toLocaleDateString()}</p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">1. Objet</h2>
          <p>
            Les présentes Conditions Générales d'Utilisation ont pour objet de définir les modalités de mise à disposition des services du site "votrelegende.fr" (ci-après nommé "le Service") et les conditions d'utilisation du Service par l'Utilisateur.
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">2. Accès au service</h2>
          <p>
            Le Service est accessible gratuitement à tout Utilisateur disposant d'un accès à internet. Tous les coûts afférents à l'accès au Service, que ce soit les frais matériels, logiciels ou d'accès à internet sont exclusivement à la charge de l'utilisateur.
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">3. Propriété intellectuelle</h2>
          <p>
            Les marques, logos, signes ainsi que tout le contenu du site (textes, images, son...) font l'objet d'une protection par le Code de la propriété intellectuelle et plus particulièrement par le droit d'auteur.
          </p>
          <p>
            L'Utilisateur sollicite l'autorisation préalable du site pour toute reproduction, publication, copie des différents contenus. Il s'engage à une utilisation des contenus du site dans un cadre strictement privé, toute utilisation à des fins commerciales et publicitaires est strictement interdite.
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">4. Données personnelles</h2>
          <p>
            Les informations demandées à l'inscription au site sont nécessaires et obligatoires pour la création du compte de l'Utilisateur. En particulier, l'adresse électronique pourra être utilisée par le site pour l'administration, la gestion et l'animation du service.
          </p>
          <p>
            Le site assure à l'Utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés.
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">5. Responsabilité</h2>
          <p>
            Les informations communiquées sur le site "votrelegende.fr" sont présentées à titre indicatif et général sans valeur contractuelle. Malgré des mises à jour régulières, le site ne peut être tenu responsable de la modification des dispositions administratives et juridiques survenant après la publication. De même, le site ne peut être tenu responsable de l'utilisation et de l'interprétation de l'information contenue dans ce site.
          </p>
          <p className="bg-[#EFEDE9] p-4 rounded-lg border-l-4 border-[#C9A24D]">
            <strong>Important :</strong> Les services de numérologie et les contenus générés (livres, rapports) sont fournis à des fins de divertissement et de développement personnel uniquement. Ils ne constituent en aucun cas un conseil médical, psychologique, juridique ou financier. L'éditeur ne saurait être tenu responsable des décisions prises par l'utilisateur sur la base des informations fournies.
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">6. Liens hypertextes</h2>
          <p>
            Des liens hypertextes peuvent être présents sur le site. L'Utilisateur est informé qu'en cliquant sur ces liens, il sortira du site "votrelegende.fr". Ce dernier n'a pas de contrôle sur les pages web sur lesquelles aboutissent ces liens et ne saurait, en aucun cas, être responsable de leur contenu.
          </p>

          <h2 className="text-xl font-bold text-[#5B4B8A] mt-8 mb-4">7. Droit applicable et juridiction compétente</h2>
          <p>
            La législation française s'applique au présent contrat. En cas d'absence de résolution amiable d'un litige né entre les parties, les tribunaux français seront seuls compétents pour en connaître.
          </p>
        </div>
      </div>
    </div>
  );
}
