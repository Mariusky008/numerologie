# Documentation Technique & Fonctionnelle - Numérologie Expert

## 1. Vue d'Ensemble
Cette application est une plateforme complète de Numérologie et d'Astrologie générant des rapports détaillés, des visualisations interactives et un "Livre de Vie" personnalisé. Elle combine des algorithmes traditionnels (Pythagore) et modernes avec des calculs astronomiques précis.

## 2. Fonctionnalités Clés

### 2.1 Flux Utilisateur (Onboarding)
*   **Collecte de Données** : Prénoms, Nom de Naissance, Date/Heure/Lieu de Naissance.
*   **Focus Utilisateur** : (Désactivé en V2.4) Le choix explicite a été retiré pour fluidifier l'expérience. L'analyse couvre désormais tous les domaines par défaut.
*   **Calcul Temps Réel** : Génération instantanée du thème lors de la validation.

### 2.2 Landing Page Hero (Nouveau Design)
*   **Architecture** : Composant `LandingPageHero.tsx` remplaçant l'ancienne page d'accueil.
*   **Ambiance** : Thème mystique avec animation d'ailes d'ange (`framer-motion`) et particules.
*   **Interactions** :
    *   *Bouton "Voir un extrait"* : Ouvre une modale simulant la lecture d'une page du livre (Chapitre 1).
    *   *Bouton "Thomas parle de son livre"* : Ouvre une modale de témoignage premium avec photo et mise en page éditoriale (Lettre à droite, Profil à gauche).
*   **Responsive** : Design adaptatif mobile/desktop, y compris pour les modales complexes.

### 2.3 Rapport Web Interactif
*   **Tableau de Bord** : Affichage des nombres clés (Chemin de Vie, Expression).
*   **Visualisations** :
    *   *Radar de Personnalité* : Comparaison Expression / Élan Spirituel / Image Sociale / Chemin de Vie.
    *   *Grille d'Inclusion* : Matrice 3x3 visualisant les manques (Dettes) et excès (Forces).
    *   *Plans d'Expression* : Jauges pour les plans Mental, Physique, Émotionnel, Intuitif.
*   **Astrologie** : Signe Solaire, Ascendant, Planète Dominante (calculés via éphémérides).
*   **Météo Vibratoire** : Prévisions journalières et mensuelles.

### 2.4 Rapport PDF (Génération Dynamique)
*   **Moteur de Rendu** : `FullReportV2` génère un rapport imprimable de haute qualité (A4).
*   **Contenu** : 40+ pages incluant l'analyse détaillée, les graphiques vectoriels et les prévisions sur 12 mois.
*   **Design** : Charte graphique "Roman de Vie" (Crème `#FAF9F7`, Bleu Nuit `#2C2F4A`, Or `#C9A24D`).

### 2.5 Monétisation & Checkout (Obsolète voir V2.6)
*   *Ancienne version V2.5* : Tunnel multi-options (49€ + 29€). Remplacé par le Pack Unique en V2.6.

## 3. Algorithme de Numérologie (`lib/numerology/engine.ts`)

### 3.1 Système de Guématrie
Utilisation du système Pythagoricien (A=1, B=2... I=9, J=1...).
*   **Normalisation** : Suppression des accents et caractères spéciaux avant calcul.
*   **Réduction** : Somme des chiffres jusqu'à obtenir un nombre entre 1 et 9.

### 3.2 Règles d'Exception (Nombres Spéciaux)
L'algorithme détecte et préserve :
*   **Maîtres Nombres** : 11, 22, 33 (ne sont pas réduits).
*   **Dettes Karmiques** : 13, 14, 16, 19 (identifiés avant réduction finale).
    *   *Exemple* : Un 13 devient 4, mais est flagué comme "Dette 13".

### 3.3 Calculs Fondamentaux
1.  **Chemin de Vie** : Somme verticale de la Date de Naissance (Jour + Mois + Année).
2.  **Nombre d'Expression** : Somme de toutes les lettres du nom complet.
3.  **Élan Spirituel (Soul Urge)** : Somme des voyelles.
4.  **Image Sociale (Personality)** : Somme des consonnes.

### 3.4 Grille d'Inclusion & Plans
*   **Inclusion** : Comptage de l'occurrence de chaque chiffre (1-9) dans le nom complet.
    *   *Interprétation* : Case vide = Leçon Karmique ; Case chargée = Talent inné.
*   **Plans d'Expression** : Répartition des lettres selon leur catégorie :
    *   *Mental* : 1, 8, 9
    *   *Physique* : 4, 5
    *   *Émotionnel* : 2, 3, 6
    *   *Intuitif* : 7 (et Maîtres Nombres)

### 3.6 Algorithmes Avancés
*   **Défis de Vie** : Calcul des 4 défis majeurs (Mineur 1, Mineur 2, Majeur, Supplémentaire) basés sur les soustractions de la date de naissance.
*   **Cycles de Vie** : Calcul des 3 grands cycles (Formatif, Productif, Moisson).
*   **Ponts (Bridges)** : Analyse du lien entre le Chemin de Vie et l'Expression pour harmoniser les conflits.
*   **Prévisions Carrière** : Projection sur 10 ans des années personnelles pour la planification stratégique.
*   **Vibration du Lieu** : Analyse numérologique des noms de ville pour la relocalisation.

## 4. Moteur Astrologique (`lib/astro/engine.ts`)

Utilise la librairie `astronomy-engine` pour des calculs astronomiques de précision (NASA/JPL ephemerides).

### 4.1 Thème Natal (Real Astro)
*   **Entrées** : Date, Heure, Latitude, Longitude (via géocodage Google/Mapbox).
*   **Calculs Géolocalisés** :
    *   *Temps Sidéral Local (LST)* : Ajusté précisément selon la longitude exacte.
    *   *Ascendant (AC)* : Calcul trigonométrique basé sur l'intersection de l'écliptique et de l'horizon Est local.
    *   *Milieu du Ciel (MC)* : Point de culmination méridien local.
*   **Positions Planétaires** :
    *   Vecteurs géocentriques pour : Soleil, Lune, Mercure, Vénus, Mars, Jupiter, Saturne, Uranus, Neptune, Pluton.
    *   Conversion en longitude écliptique (0-360°).
*   **Système de Domification** :
    *   Utilisation du système de **Maisons Égales** (Equal Houses) basé sur l'Ascendant pour définir les 12 domaines de vie.
*   **Rétrogradation** :
    *   Détection du mouvement apparent par calcul différentiel (position T vs T-1h).

### 4.2 Transits Actuels
Calcul de la position actuelle des planètes pour fournir la "Météo Astrale" du jour.

## 5. Algorithme "Roman de Vie" (`BookBackCover.tsx`)

Génération procédurale d'un synopsis narratif pour le livre physique.

### 5.1 Logique de Construction
Le texte est assemblé dynamiquement selon la structure :
1.  **L'Incipit (Le Héros)** : Basé sur le **Chemin de Vie**.
    *   *Ex:* Un CV 1 est décrit comme un leader solitaire ; un CV 2 comme un médiateur en quête d'harmonie.
2.  **L'Intrigue (Le Conflit)** : Basée sur le **Focus Utilisateur**.
    *   *Ex:* Focus "Amour" déclenche un arc narratif relationnel ; "Carrière" un dilemme d'ambition.
3.  **L'Atmosphère (Le Décor)** : Basée sur le **Signe Solaire/Ascendant**.
    *   *Ex:* Une touche "ardente" pour un Bélier, "mystique" pour un Poissons.

## 6. Stack Technique
*   **Framework** : Next.js 14+ (App Router).
*   **Langage** : TypeScript.
*   **Styling** : Tailwind CSS + Framer Motion (Animations).
*   **IA & Chat** : Vercel AI SDK 3.0+ / OpenAI GPT-4.
*   **Astro** : `astronomy-engine`.
*   **Persistence** : LocalStorage / Supabase (pour les requêtes).

## 7. Mises à jour V2.6 (Janvier 2026)

### 7.1 Coach Numérologue IA (`/coach`)
Remplacement de l'avatar vidéo interactif (HeyGen) par une solution Chatbot texte/audio plus performante et économique.
*   **Technologie** : Vercel AI SDK Core (`streamText`) + OpenAI GPT-4 Turbo.
*   **Interface** : Composant `CoachChat.tsx` style messagerie moderne.
*   **Saisie Vocale** : Intégration Speech-to-Text native navigateur (Web Speech API) pour dicter les questions.
*   **Contextualisation** : L'IA reçoit automatiquement le profil numérologique complet du client (Chemin de Vie, Expression, Cycles...) pour personnaliser ses réponses.
*   **Sécurité** : Accès restreint via `requestId` vérifié en base de données.

### 7.2 Le Pack Révélation (Offre Unique)
Simplification radicale de l'offre commerciale pour maximiser la conversion.
*   **Produit Unique** : "Le Pack Révélation".
*   **Prix** : **29,00 €** (au lieu de 49€ + options).
*   **Contenu du Pack** :
    1.  **Vidéo Avatar** (5 min) : Analyse émotionnelle générée par HeyGen.
    2.  **Dossier PDF** (40 pages) : Rapport technique complet généré par l'algorithme.
    3.  **Coach IA** (30 min) : Accès offert au chatbot expert pour poser des questions.
*   **Modifications Checkout** :
    *   Mise à jour de `app/checkout/page.tsx` pour afficher le prix unique et les nouvelles inclusions.
    *   Sécurisation de `app/api/checkout/route.ts` pour forcer le montant de 29€ côté serveur Stripe.

### 7.3 Expérience Post-Achat
*   **Emails Transactionnels** : Ajout d'un bouton "Accéder à mon Coach" dans l'email de livraison de la vidéo.
*   **Lien d'Accès** : Format `/coach?id={COMMANDE_ID}&name={PRENOM}` pour une connexion fluide sans mot de passe.

### 7.4 Workflow Email & Livraison (Automatisé)
Le processus de livraison a été optimisé pour gérer le délai de génération de la vidéo (HeyGen) sans frustrer le client.

1.  **Confirmation Immédiate (Automatique)**
    *   *Déclencheur* : Paiement Stripe validé (`checkout.session.completed`).
    *   *Action* : Envoi de l'email `EmailConfirmation`.
    *   *Contenu* : Confirmation de commande, rassurance sur le délai de traitement (création de la vidéo unique), et annonce du contenu à venir.

2.  **Génération & Production (Côté Admin)**
    *   L'administrateur reçoit la commande dans son Dashboard.
    *   Il lance la génération du script IA, puis de la vidéo HeyGen.
    *   Une fois la vidéo prête, l'admin clique sur **"Envoyer Pack Complet"**.

3.  **Livraison Finale (All-in-One)**
    *   *Déclencheur* : Action manuelle Admin via API `/api/send-video`.
    *   *Action* : Envoi de l'email `EmailDeliverables`.
    *   *Contenu Unique* : Un seul email regroupant les 3 piliers de l'offre :
        *   ▶️ Lien vers la **Vidéo Avatar**.
        *   📄 Lien de téléchargement du **Rapport PDF**.
        *   🎙️ Accès direct à **L'Oracle Vocal** (Chatbot).

---
*Document mis à jour le 22 Janvier 2026 - Version 2.7*
