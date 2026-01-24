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
*   **Paiement simplifié :** Un bouton unique pour acheter l'option à 29€.

### Tunnel de Paiement (`/api/checkout/upgrade`)
*   Crée une session Stripe spécifique marquée comme "Upgrade".
*   Transmet l'ID de la commande originale à Stripe pour faire le lien.

### Synchronisation (`/api/webhook/stripe`)
*   À la validation du paiement, le système détecte qu'il s'agit d'un "Upgrade".
*   Il retrouve la commande originale dans la base de données.
*   Il met à jour la commande pour activer l'option `includeBook = true`.
*   Le client reçoit le mail de confirmation, et vous voyez la commande mise à jour dans votre admin.

---

## Résumé des URLs Clés

| Page | URL | Usage |
| :--- | :--- | :--- |
| **Admin** | `/admin` | Gestion des commandes et liens |
| **Preview Emails** | `/email-preview` | Vérification du design des mails |
| **Page Upsell** | `/upgrade-book?orderId=...` | Page de vente du livre (nécessite un ID) |
| **Rapport PDF** | `/pdf-report-v2?order_id=...` | Consultation du rapport client |
