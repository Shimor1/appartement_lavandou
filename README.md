# TribuDudu — Site de Location d'Appartements (Le Lavandou)

Nouveau site vitrine moderne, épuré et élégant pour les locations de vacances **TribuDudu** de la Famille Dugail - Van Asbroeck, situées à la **Résidence Les Horizons** au **Lavandou** (Var, Côte d'Azur).

---

## 🌟 Atouts & Fonctionnalités du Nouveau Site

- **Design Moderne & Épuré (Style Riviera Chic)** : Palette marine et sable chaud, typographie élégante (*Playfair Display* et *Plus Jakarta Sans*), micro-interactions fluides et mise en page responsive.
- **Support Multilingue Intégré (FR / EN / NL / DE)** : Bascule instantanée entre le Français, l'Anglais, le Néerlandais et l'Allemand grâce au dictionnaire de traduction localisé (`assets/js/translations.js`), sans rechargement de page.
- **Photos Haute Définition & Lightbox Plein Écran** : Galerie interactive avec aperçus miniatures et agrandissement plein écran (avec navigation clavier `Flèches` / `Échap` et tactile).
- **Fiches Détaillées des 2 Types de Logements** :
  - **Les 2 Studios Cabine Vue Mer** (Balcon, climatisation, lits superposés, lave-linge, parking privatif).
  - **Le Grand Appartement T3 Vue Mer** (Grande terrasse panoramique, 2 chambres doubles, cuisine tout équipée avec lave-vaisselle, climatisation, parking privatif).
- **Prise de Contact Directe** :
  - Formulaire interactif de demande de séjour (avec génération automatique d'un email pré-rempli et bouton de copie instantanée dans le presse-papier).
  - Accès en un clic à l'appel téléphonique, à WhatsApp et à l'envoi d'email.
- **Carte Interactive** : Carte OpenStreetMap / Leaflet intégrée, sans clé API payante requise, centrée sur la Résidence Les Horizons (18 Avenue du Président Auriol).

---

## 🚀 Déploiement sur GitHub Pages

Le site a été conçu pour fonctionner directement sur **GitHub Pages** (fichiers statiques, chemins relatifs `./assets/...`, fichier `.nojekyll` inclus).

### Étapes d'activation :

1. **Publiez le projet sur un dépôt GitHub** :
   ```bash
   git init
   git add .
   git commit -m "Site moderne TribuDudu pour GitHub Pages"
   git branch -M main
   git remote add origin https://github.com/VOTRE_PSEUDO/NOM_DU_REPO.git
   git push -u origin main
   ```

2. **Activez GitHub Pages dans les paramètres du dépôt** :
   - Allez sur votre dépôt GitHub : `https://github.com/VOTRE_PSEUDO/NOM_DU_REPO`
   - Cliquez sur l'onglet **Settings** (Paramètres).
   - Dans le menu de gauche, cliquez sur **Pages** (dans la section *Code and automation*).
   - Sous **Build and deployment** :
     - Source : **Deploy from a branch**
     - Branch : sélectionnez **main** (ou `master`) et le dossier **/ (root)**.
     - Cliquez sur **Save**.

3. **Votre site est en ligne !**
   Après 1 à 2 minutes, votre site sera accessible à l'adresse :
   `https://VOTRE_PSEUDO.github.io/NOM_DU_REPO/`

---

## 📁 Structure des Fichiers

```
├── index.html                   # Page d'accueil moderne & complète
├── .nojekyll                    # Indique à GitHub Pages de servir directement les assets
├── README.md                    # Ce guide
├── assets/
│   ├── css/
│   │   └── style.css            # Feuille de style CSS moderne
│   ├── js/
│   │   ├── main.js              # Interactions, lightbox, formulaire & carte
│   │   └── translations.js      # Traductions FR, EN, NL, DE
│   └── images/
│       ├── hero-lavandou-vue-mer.jpg
│       ├── studio-balcon-mer.jpg
│       ├── studio-sejour.jpg
│       ├── studio-cuisine.jpg
│       ├── studio-salle-eau.jpg
│       ├── studio-cabine.jpg
│       ├── appart-terrasse-mer.jpg
│       ├── appart-cuisine-sejour.jpg
│       ├── appart-salon.jpg
│       ├── appart-chambre-1.jpg
│       ├── appart-chambre-2.jpg
│       ├── lavandou-plage.jpg
│       ├── logo-tribududu.png
│       └── logo-badge.png
└── old/                         # Ancien site conservé pour référence
```
