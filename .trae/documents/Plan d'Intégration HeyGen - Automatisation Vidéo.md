# Plan d'Intégration Complet (HeyGen + ChatGPT)

Voici la version finale et corrigée du plan, intégrant les deux intelligences artificielles.

## Phase 1 : Configuration et Backend
1.  **Configuration des Clés API** : Ajouter les clés `HEYGEN_API_KEY` et `OPENAI_API_KEY` dans les variables d'environnement (`.env`).
2.  **Création des Services** :
    *   `lib/openai.ts` : Pour gérer la rédaction intelligente du script.
    *   `lib/heygen.ts` : Pour gérer la production vidéo.
3.  **Mise à jour de la Base de Données** : Ajouter des colonnes à votre table `book_requests` pour stocker :
    *   `generated_script` (Le texte écrit par ChatGPT)
    *   `heygen_video_id` (ID de la vidéo)
    *   `video_url` (URL finale)
    *   `video_status` (Statut de production)

## Phase 2 : Automatisation de la Génération (Le Cerveau)
1.  **Génération du Script via ChatGPT** : **(Nouveau)** Intégrer l'API OpenAI pour transformer les données numérologiques en un script narratif de 5 minutes. Nous n'utiliserons pas un simple modèle, mais une véritable IA pour rédiger l'histoire.
2.  **API Route de Rédaction** : Créer une route `/api/generate-script` qui :
    *   Reçoit l'ID de la demande.
    *   Appelle OpenAI.
    *   Sauvegarde le texte généré en base de données pour validation.

## Phase 3 : Production Vidéo (La Voix)
1.  **API Route de Lancement** : Créer une route `/api/generate-video` qui :
    *   Prend le script **validé** par vous.
    *   Appelle l'API HeyGen.
2.  **Webhook HeyGen** : Créer une route `/api/webhook/heygen` pour recevoir la notification quand la vidéo est prête et mettre à jour le statut automatiquement.

## Phase 4 : Interface Admin et Validation
1.  **Mise à jour du Dashboard (`admin/page.tsx`)** :
    *   Ajout d'un bouton **"✨ Écrire avec ChatGPT"**.
    *   Ajout d'une **zone de texte éditable** pour relire le script.
    *   Ajout d'un bouton **"🎥 Lancer HeyGen"** (une fois le texte validé).
    *   Ajout du lecteur vidéo final.

C'est ce plan-ci que je vais exécuter. Est-ce que cela vous convient ?
