# ZigZag Visuals — Site vitrine

Site vitrine du studio **ZigZag Visuals**, boîte de production audiovisuelle à Montreux (Suisse) : photo, vidéo, son et studio, avec un seul point de contact par projet.

🌐 **En ligne :** [zigzagvisuals.ch](https://zigzagvisuals.ch)

---

## Aperçu

Site **100 % statique** : pas de build, pas de framework, pas d'étape de compilation. Le HTML, le CSS et le JS sont servis directement. La base est un template Webflow (« Alture ») exporté en statique, puis retravaillé **section par section à la main**.

Chaque page se suffit à elle-même : on ouvre le `.html` et il fonctionne.

## Stack technique

| Élément | Détail |
|---|---|
| **Structure** | HTML statique (une page = un fichier `.html`) |
| **Styles** | CSS Webflow généré (`css/alture-template.webflow.shared.*.css`, **lecture seule**) + blocs `<style>` custom scopés dans le `<head>` de chaque page |
| **Scripts** | Vanilla JS (petites IIFE en bas de `<body>`) + jQuery, GSAP et runtime Webflow, tous chargés localement depuis `js/` |
| **Scroll fluide** | [Lenis](https://github.com/darkroomengineering/lenis) (chargé via CDN unpkg) |
| **Hébergement** | Vercel (déploiement automatique sur push) |

> ⚠️ Le fichier CSS du template (`css/alture-template.webflow.shared.ef0833b7b.css`) est **généré par Webflow** : il ne doit **jamais** être édité à la main. Tout override custom passe par un bloc `<style>` dans le `<head>` de la page concernée.

## Structure du projet

```
.
├── index.html                  # Page d'accueil (toutes les sections principales)
├── contact.html                # Page contact
├── studio.html                 # Page studio
├── perdu.html                  # Page 404 (exclue de l'indexation)
├── equipe/
│   └── tino.html               # Pages détail par membre de l'équipe
├── legal/
│   ├── confidentialite.html    # Politique de confidentialité
│   └── conditions-utilisation.html
├── projet_Glion_VS/            # Page projet dédiée (Glion)
│   └── index.html
├── css/
│   └── alture-template.webflow.shared.*.css   # CSS Webflow (lecture seule)
├── js/                         # jQuery, GSAP, runtime Webflow, scripts custom
│   ├── header-scroll.js
│   ├── preloader.js
│   └── webflow-*.js
├── images/                     # Photos, vidéos, logos, icônes (~110 fichiers)
├── favicon.ico                 # Favicon racine (multi-tailles 16→256px)
├── robots.txt                  # Directives crawl
├── sitemap.xml                 # Plan du site pour les moteurs de recherche
├── google*.html                # Fichier de vérification Google Search Console
└── CLAUDE.md                   # Guide de direction artistique & conventions
```

## Démarrage en local

Aucune dépendance à installer. Il suffit de servir le dossier avec n'importe quel serveur statique (les chemins étant absolus, `/…`, ouvrir le fichier en `file://` ne suffit pas — il faut un serveur) :

```bash
# Python (déjà installé sur la plupart des machines)
python -m http.server 8000

# ou Node
npx serve .
```

Puis ouvrir http://localhost:8000.

> 💡 L'extension **Live Server** de VS Code fonctionne également très bien.

## Conventions & direction artistique

Toutes les règles de direction artistique, les conventions de code (où vivent les styles, le JS, la palette chromatique, la typographie, la grille, les motifs d'interaction) et les pièges déjà rencontrés sont documentés en détail dans **[`CLAUDE.md`](CLAUDE.md)**.

**À lire avant toute nouvelle section.** En résumé :

- Un bloc `<style>` custom par section dans le `<head>`, dans le même ordre que les sections du `<body>`, précédé d'un commentaire en français.
- Le JS custom : petites IIFE vanilla en bas du `<body>`, une par section, commentées en français.
- Palette, typographie et grille communes à tout le site — la cohérence est la signature.
- `prefers-reduced-motion` obligatoire sur chaque section animée.
- Nettoyer les reliquats du template au passage (liens morts, `alt` périmés, texte placeholder).

## Pages du site

| Page | URL | Fichier |
|---|---|---|
| Accueil | `/` | `index.html` |
| Studio | `/studio` | `studio.html` |
| Contact | `/contact.html` | `contact.html` |
| Projet Glion | `/projet_Glion_VS/index.html` | `projet_Glion_VS/index.html` |
| Équipe (détail) | `/equipe/tino.html` | `equipe/*.html` |
| Confidentialité | `/legal/confidentialite.html` | `legal/confidentialite.html` |
| Conditions d'utilisation | `/legal/conditions-utilisation.html` | `legal/conditions-utilisation.html` |
| 404 | — | `perdu.html` |

> Les URLs indexées (Accueil, Studio, Contact, Projet Glion, Équipe/Tino) sont listées dans `sitemap.xml`.

## SEO & fichiers spéciaux

- **`favicon.ico`** (racine) + variantes PNG dans `images/` — déclarés dans le `<head>` de chaque page.
- **`robots.txt`** — autorise le crawl, exclut `/legal/` et `/perdu.html`, pointe vers le sitemap.
- **`sitemap.xml`** — liste des URLs indexables.
- **`google919992c7deed3d80.html`** — fichier de vérification de propriété pour la Google Search Console (ne pas supprimer).

## Déploiement

Le site est hébergé sur **Vercel**. Le déploiement est **automatique** : chaque push sur la branche `main` déclenche un nouveau build/déploiement.

```bash
git add .
git commit -m "votre message"
git push
```

Après un changement qui touche le SEO (favicon, méta, titres…), penser à demander une **ré-indexation** dans la [Google Search Console](https://search.google.com/search-console) — la mise à jour côté Google peut prendre de quelques jours à quelques semaines.

## Crédits

Studio **ZigZag Visuals** — Montreux, Suisse.
Template de base : « Alture » (Webflow), entièrement retravaillé.
