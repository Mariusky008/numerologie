# Documentation Technique & Fonctionnelle - Numérologie Expert

## 1. Vue d'Ensemble
Cette application est une plateforme complète de Numérologie et d'Astrologie générant des rapports détaillés, des visualisations interactives et un "Livre de Vie" personnalisé. Elle combine des algorithmes traditionnels (Pythagore) et modernes avec des calculs astronomiques précis.

## 2. Fonctionnalités Clés

### 2.1 Flux Utilisateur (Onboarding)
*   **Collecte de Données** : Prénoms, Nom de Naissance, Date/Heure/Lieu de Naissance.
*   **Focus Utilisateur** : Choix d'un domaine prioritaire (Amour, Carrière, Mission, Spiritualité) pour orienter l'interprétation.
*   **Calcul Temps Réel** : Génération instantanée du thème lors de la validation.

### 2.2 Rapport Web Interactif
*   **Tableau de Bord** : Affichage des nombres clés (Chemin de Vie, Expression).
*   **Visualisations** :
    *   *Radar de Personnalité* : Comparaison Expression / Élan Spirituel / Moi Intime / Chemin de Vie.
    *   *Grille d'Inclusion* : Matrice 3x3 visualisant les manques (Dettes) et excès (Forces).
    *   *Plans d'Expression* : Jauges pour les plans Mental, Physique, Émotionnel, Intuitif.
*   **Astrologie** : Signe Solaire, Ascendant, Planète Dominante (calculés via éphémérides).
*   **Météo Vibratoire** : Prévisions journalières et mensuelles.

### 2.3 Rapport PDF (Génération Dynamique)
*   **Moteur de Rendu** : `FullReportV2` génère un rapport imprimable de haute qualité (A4).
*   **Contenu** : 40+ pages incluant l'analyse détaillée, les graphiques vectoriels et les prévisions sur 12 mois.
*   **Design** : Charte graphique "Hero" (Crème `#FAF9F7`, Bleu Nuit `#2C2F4A`, Or `#C9A24D`).

### 2.4 Monétisation & Checkout
*   **Tunnel de Vente** : Page `/checkout` dédiée.
*   **Options** :
    *   Rapport PDF Digital (29€).
    *   Bundle PDF + Livre Papier (49€ + 29€ optionnel).
*   **Logique de Livraison** : Formulaire conditionnel pour l'adresse postale si le livre papier est choisi.

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
4.  **Moi Intime (Personality)** : Somme des consonnes.

### 3.4 Grille d'Inclusion & Plans
*   **Inclusion** : Comptage de l'occurrence de chaque chiffre (1-9) dans le nom complet.
    *   *Interprétation* : Case vide = Leçon Karmique ; Case chargée = Talent inné.
*   **Plans d'Expression** : Répartition des lettres selon leur catégorie :
    *   *Mental* : 1, 8, 9
    *   *Physique* : 4, 5
    *   *Émotionnel* : 2, 3, 6
    *   *Intuitif* : 7 (et Maîtres Nombres)

### 3.5 Cycles Temporels
*   **Année Personnelle** : Jour + Mois + Année en cours (réduit).
*   **Mois Personnel** : Année Personnelle + Mois en cours.
*   **Jour Personnel** : Mois Personnel + Jour en cours.
*   **Transits (Lettres de Passage)** : Calcul de la lettre active pour l'âge actuel sur les plans Physique (Prénom), Mental (Nom) et Spirituel (Total).

## 4. Moteur Astrologique (`lib/astro/engine.ts`)

Utilise la librairie `astronomy-engine` pour des calculs astronomiques de précision (NASA/JPL ephemerides).

### 4.1 Thème Natal (Real Astro)
*   **Entrées** : Date, Heure, Latitude, Longitude (via géocodage).
*   **Calculs** :
    *   *Ascendant (AC)* & *Milieu du Ciel (MC)* : Calcul du Temps Sidéral Local (LST).
    *   *Positions Planétaires* : Vecteurs géocentriques pour Soleil, Lune, Mercure... Pluton.
    *   *Maisons* : Calcul de la maison astrologique pour chaque planète.
    *   *Rétrogradation* : Détection du mouvement rétrograde par comparaison différentielle (-1h).

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
*   **Framework** : Next.js 14 (App Router).
*   **Langage** : TypeScript.
*   **Styling** : Tailwind CSS + Framer Motion (Animations).
*   **Astro** : `astronomy-engine`.
*   **Persistence** : LocalStorage (pour l'état session) / URL Params (pour le partage).

---
*Document généré le 18 Janvier 2026 - Version 2.4*
