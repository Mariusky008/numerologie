# Documentation des Nouvelles Fonctionnalités

Ce document récapitule les dernières mises à jour techniques et fonctionnelles déployées sur la plateforme **Votre Légende**.

---

## 1. Administration & Gestion (Admin Dashboard)

### Liens Rapides & Copie
Dans votre tableau de bord administrateur (`/admin`), pour chaque commande client, vous disposez désormais de boutons d'action rapide :
- **Copier le lien PDF** : Génère un lien direct vers le rapport du client.
  - *Correction technique* : Le lien inclut désormais l'identifiant unique de la commande (`order_id`). Le rapport se charge instantanément sans erreur "Chargement infini", car il va chercher les données directement en base de données.
- **Copier le lien Coach** : Génère un lien direct vers l'interface de chat avec l'Oracle, pré-configuré avec le prénom du client.

---

## 2. Système d'Emails Transactionnels

### Identité d'Envoi
Tous les emails sont désormais envoyés via l'adresse professionnelle : **`contact@votrelegende.fr`**.

### Nouveaux Templates d'Email
Quatre types d'emails sont maintenant configurés et prêts à l'emploi :

1.  **Confirmation de Commande (Immédiat)**
    *   *Quand :* Tout de suite après l'achat.
    *   *Contenu :* Rassure le client, explique que la vidéo est en cours de génération (délai technique).
2.  **Livraison Standard (Pack Révélation)**
    *   *Quand :* Une fois la génération terminée.
    *   *Contenu :* Lien vers la Vidéo + Lien vers le Rapport PDF + Lien vers le Coach.
3.  **Livraison avec Option Roman**
    *   *Quand :* Idem, mais si le client a pris l'option livre.
    *   *Contenu :* Ajoute un 4ème bouton "Lire mon Roman (PDF)".
4.  **Upsell / Relance Roman (J+2)**
    *   *Quand :* Envoi manuel ou automatisé ultérieurement.
    *   *Contenu :* Propose aux clients n'ayant pas pris le livre de l'acheter pour compléter leur expérience.

### Outil de Prévisualisation
Une page secrète a été créée pour visualiser ces emails en conditions réelles :
👉 **[https://www.votrelegende.fr/email-preview](https://www.votrelegende.fr/email-preview)**

---

## 3. Module "Upsell" (Vente Additionnelle)

Un système complet a été mis en place pour permettre aux clients d'acheter le "Roman de leur Vie" *après* leur commande initiale, sans devoir ressaisir leurs informations.

### Page de Vente dédiée (`/upgrade-book`)
*   **Accès sécurisé :** La page ne fonctionne que si l'on possède un lien valide contenant l'ID de la commande originale.
*   **Personnalisation :** Elle accueille le client par son prénom ("Complétez votre Légende, Jean-Philippe").
*   **Paiement simplifié :** Un bouton unique pour acheter l'option à 49€.

### Tunnel de Paiement (`/api/checkout/upgrade`)
*   Crée une session Stripe spécifique marquée comme "Upgrade".
*   Transmet l'ID de la commande originale à Stripe pour faire le lien.

### Synchronisation (`/api/webhook/stripe`)
*   À la validation du paiement, le système détecte qu'il s'agit d'un "Upgrade".
*   Il retrouve la commande originale dans la base de données.
*   Il met à jour la commande pour activer l'option `includeBook = true`.
*   Le client reçoit le mail de confirmation, et vous voyez la commande mise à jour dans votre admin.

---

## 4. Expérience "Révélation" (Teasing & Conversion)

Une nouvelle page de démo (`/demo-reveal`) a été créée pour maximiser la conversion après la saisie des informations de naissance.

### Concept "Gamifié"
Au lieu d'un simple tableau de résultats, le client vit une expérience progressive :
1.  **L'Archétype :** Une carte "Révélée" qui flatte son ego (ex: "Le Sage", "Le Pionnier") avec une description valorisante.
2.  **Le Paywall Vidéo :** Une vidéo d'introduction de l'Oracle se lance automatiquement (chargement instantané) mais se coupe au bout de 8 secondes avec un message de suspense ("J'ai découvert un blocage...").
3.  **Les Cartes Verrouillées :** Deux autres cartes ("Ton Blocage Inconscient", "Ta Destinée 2026") sont floutées pour créer le désir.
4.  **Diagnostic Vital :** Une liste de 3 points de douleur ("Tu te sens incompris ?") générés dynamiquement pour que le client se sente "vu".

### Promesse Tenue (PDF)
Pour justifier la promesse "Mode d'emploi précis", le rapport PDF inclut désormais un encart **"💡 Votre Exercice de Déblocage"**.
*   Il propose une action concrète et unique basée sur le Défi Majeur du client (ex: "Dites NON sans vous justifier").

---

## 5. Module "Expert Booking" (High Ticket)

Un système d'Upsell Premium a été ajouté pour vendre des consultations humaines (49€ ou 149€) en plus de l'IA.

### Page de Vente (`/expert-booking`)
*   Présente l'experte (Marie D.) et rassure sur la complémentarité IA + Humain.
*   Propose deux offres claires : "Flash" (15 min) et "Profond" (45 min).
*   Inclut une garantie "Satisfait ou Remboursé".

### Points d'Entrée Stratégiques
L'accès à cette page est proposé à 3 moments clés du parcours client :
1.  **Chat Coach :** Un bouton "Parler à un Expert Humain" est présent dans l'interface de discussion.
2.  **Email de Livraison :** Un P.S. en bas du mail invite à réserver si la situation est complexe.
3.  **Rapport PDF :** La dernière page contient un encart "Besoin d'aller plus loin ?".

### Flux Technique (À activer)
Actuellement, les boutons sont en place. Pour activer les paiements :
1.  Créer des **Payment Links** sur Stripe pour les offres à 49€ et 149€.
2.  Configurer **Calendly** pour la prise de RDV.
3.  Connecter Stripe à Calendly (redirection après paiement) pour automatiser tout le processus.

---

## Résumé des URLs Clés

| Page | URL | Usage |
| :--- | :--- | :--- |
| **Admin** | `/admin` | Gestion des commandes et liens |
| **Preview Emails** | `/email-preview` | Vérification du design des mails |
| **Page Upsell** | `/upgrade-book?orderId=...` | Page de vente du livre (nécessite un ID) |
| **Page Booking** | `/expert-booking` | Page de réservation consultation expert |
| **Démo Reveal** | `/demo-reveal` | Nouvelle page de résultat "Teasing" |
| **Rapport PDF** | `/pdf-report-v2?order_id=...` | Consultation du rapport client |
| **Preview Hub** | `/preview-hub` | **NOUVEAU** : Centre de contrôle pour tout voir |
