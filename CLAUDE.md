# ZigZag Visuals — guide de direction artistique

Site vitrine (photo / vidéo / audio / web) du studio ZigZag Visuals à Montreux. Base : template Webflow "Alture" exporté en statique, retravaillé section par section à la main. Pas de build, pas de framework — HTML/CSS/JS directement.

Ce fichier synthétise la direction artistique et les conventions établies au fil des sections déjà conçues (Alice, Pourquoi Nous, Services, FAQ, Footer) dans `index.html`, pour qu'un futur agent puisse imaginer une nouvelle section cohérente sans avoir à redécouvrir ces règles par essai-erreur.

## Où vivent les choses

- `index.html` : la page principale, toutes les sections. Fichier unique, long.
- `css/alture-template.webflow.shared.ef0833b7b.css` : CSS généré par Webflow — **lecture seule, ne jamais éditer**. Contient tous les tokens (`--_colors---*`, `--fixed--*rem`, `--border-radius--*`, `--_typography---*`) et les classes de composants réutilisables du template.
- Tout override custom va dans un `<style>` scopé dans le `<head>` de `index.html`, **un bloc par section**, précédé d'un commentaire français décrivant son rôle, positionné dans le `<head>` **dans le même ordre que les sections apparaissent dans le `<body>`**.
- Tout JS custom : petites IIFE vanilla en bas du `<body>`, une par section, commentaire français au-dessus. Pas de nouvelle dépendance — jQuery/GSAP/Lenis sont déjà chargés, à réutiliser seulement quand ça a du sens (ex. `lenis.scrollTo()` plutôt que `window.scrollTo`).
- Autres pages réelles du site : `contact.html`, `studio.html`, `legal/privacy-policy.html`, `legal/terms-of-use.html` (encore en Lorem ipsum), `projet_Glion_VS/index.html` (page projet). Le sitemap logique du site : Accueil `/`, Services `#section-services`, Projets `#projets`, Studio `/studio`, Contact `/contact/1`.

## Posture générale

Sobre, épuré, artistique — jamais froid. Interactif mais jamais gadget : chaque interaction doit avoir une raison d'être. L'œil de l'utilisateur doit toujours être guidé. Chaque section réinterprète les mêmes principes avec une exécution différente — ne jamais recopier littéralement la solution CSS d'une autre section, réutiliser l'intention.

**Toujours nettoyer en chemin** : ce template contient beaucoup de reliquats (liens morts, texte placeholder, `alt` périmés, sections commentées/inertes). Les corriger au passage, en le signalant explicitement à l'utilisateur plutôt qu'en silence.

## Système chromatique

- **Neutres** : blanc/papier `--_colors---grey--50` (`#f1efed`) pour les sections claires, noir `--_colors---primary--black` (`#000`) pour les sections immersives (Footer, écrin Alice).
- **Accent principal** : `--_colors---primary--accent` (`#f3350c`, orange-rouge), utilisé partout comme signal "actif/focus" (`.label_dot`, boutons).
- **Accents secondaires réservés**, jamais interchangeables — la vraie palette de marque (retrouvée dans l'ancien projet abandonné `zigzag-website/src/styles/input.css`) contient aussi : mint `#CCFCCC`, sea `#01514E`, perfume `#C6B1F6`, vert `#3d4b3d`. Deux sont déjà attribués :
  - **mint** → Footer uniquement (ne fonctionne bien que sur fond noir, l'utilisateur la trouve "moche" sur blanc).
  - **sea** → FAQ uniquement (clin d'œil à la photo d'équipe au bord du lac).
  - **Règle** : un nouvel accent doit se justifier par le contenu ou le contexte de sa section, jamais choisi au hasard dans la palette ni recopié d'une autre section.

## Typographie & hiérarchie

- H1 fixe à `--_typography---h1--font-size` (6rem / 96px, 95% line-height) — utilisé tel quel par toutes les sections (Alice, Pourquoi Nous, Services, FAQ). Ne jamais l'agrandir pour "faire remarquer" une section : la cohérence est la signature.
- Eyebrow systématique : `.label_wrap` (petit point `.label_dot` + `.text-style-label` tracké) devant chaque titre de section.
- Tous les chiffres (numéros d'ancrage, d'index, de question) en police mono `Roboto Mono VF` (`--_typography---font-family--detail`) — jamais dans la police de texte courant. **C'est une vraie police variable** (`font-weight: 100 700` déclaré dans le `@font-face`) : `font-weight` s'anime nativement et proprement, sans changer la largeur des caractères — un bon levier pour une micro-interaction "tech" sans risque de mise en page (voir FAQ).
- La hiérarchie fine se crée **par l'interaction** (couleur, graisse, un petit trait qui se dessine) plutôt que par des tailles statiques empilées ou des éléments qui grossissent — voir "Pièges connus" ci-dessous, deux tentatives de faire grossir un chiffre au clic ont été rejetées.

## Grille & mise en page

- `padding-global` (3rem de marge latérale) + `container-medium` (max 90rem) = la grille commune. Tout le contenu s'aligne sur ce même bord gauche, jamais décalé section par section.
- L'asymétrie voulue passe par **une seule exception contrôlée** (ex. la photo FAQ qui déborde à droite via `margin-right: calc(var(--fixed--3rem) * -1)` sur un item de grid sans `width` explicite — un `width:100%` explicite empêcherait le débordement de fonctionner, voir pièges), jamais en abandonnant la grille pour tout le monde.
- Nombre d'or (φ≈1.618) en réserve comme outil de proportion quand une section a besoin de deux zones inégales (texte/image) — ex. FAQ : colonnes `38.2fr 61.8fr`.
- **Contrainte de compacité** : viser une section lisible en une seule hauteur d'écran (tester à 1440×900) — éviter les éléments démesurés comme l'a été la première version de la vidéo Alice.

## Motifs d'interaction signature

- **Verre liquide** : panneaux flous/translucides, toujours posés sur quelque chose de visuellement riche (photo, jamais un aplat) — chaque section lui donne une forme différente (fill du wordmark footer, carte glass des Services au survol, verre dépoli de la FAQ à l'ouverture d'une question). Réutiliser le principe, pas le CSS littéral.
- **Un seul élément actif à la fois**, rien de pré-ouvert par défaut — aucun panneau/question plus important qu'un autre au repos (leçon explicite de Services : le premier service ne doit pas être épinglé).
- **Hauteur de conteneur stable** : l'ouverture/fermeture se fait par overlay (photo qui se floute, réponse en surimpression) ou `grid-template-rows: 0fr → 1fr`, jamais en poussant le reste de la mise en page vers le bas. À vérifier systématiquement en mesurant la hauteur de la section avant/après un clic.
- **Médias encadrés** par défaut (coins arrondis uniformes, air autour), sauf débordement de grille délibéré et assumé (voir FAQ) — dans ce cas, les coins restent arrondis partout, y compris côté débordement.

## Mouvement

- Lenis (`const lenis = new Lenis(...)`) est le socle du scroll fluide, déjà initialisé — s'appuyer dessus (`lenis.scrollTo()`), ne jamais le contourner.
- CSS transitions plutôt que JS quand possible ; JS seulement pour basculer des classes d'état (`.is-open`, `.is-active`).
- `prefers-reduced-motion: reduce` **obligatoire sur chaque section animée** : retire les transitions (souvent via `transition: none !important` sur la liste des propriétés concernées), jamais la fonctionnalité.
- Les transitions doivent "rejoindre" un état plutôt que couper net (leçon du wordmark footer : capturer la valeur courante de l'animation CSS en JS avant de la figer, pour un raccord fluide).

## Pièges connus (leçons apprises, ne pas refaire l'erreur)

- **Un enfant `position:absolute` sans `left`/`top` ignore le `padding` de son parent** — le padding ne réduit pas le containing block d'un descendant absolument positionné. Ça avait cassé le texte de réponse FAQ sur mobile (touchait les bords) alors que ça semblait correct sur desktop (juste plus de marge disponible pour masquer le bug). Poser l'inset (`left`, `width: calc(100% - marge*2)`) directement sur l'élément absolument positionné, jamais compter sur le padding du parent flex.
- **Un enfant flouté (`filter: blur()`) peut "s'échapper" du clip arrondi de son parent sur Safari**, retombant visuellement sur un rectangle aux coins carrés. Fix standard : ajouter `mask-image: radial-gradient(white, black)` (+ `-webkit-mask-image`) sur le parent avec `overflow:clip`/`border-radius`. **Toujours vérifier le rendu réel sous WebKit** (`npx playwright install webkit`), pas seulement Chromium — le bug n'existe pas ailleurs.
- **`width:100%` sur un item de grid empêche un `margin-right` négatif de le faire déborder** — le débordement de grille ne marche que si la largeur reste `auto` (stretch par défaut), sinon le `margin` négatif ne fait que réduire l'espace après l'élément sans déplacer son propre bord.
- **Faire grossir un chiffre/élément au clic (`transform: scale()` important) risque de chevaucher le texte voisin** — testé et rejeté deux fois sur la FAQ (une fois en le faisant vraiment grossir, une fois avec un chiffre fantôme séparé qui "marchait" sur le texte). Si un élément doit gagner en présence à l'ouverture, préférer un changement de couleur/graisse/un petit trait qui se dessine — jamais un changement de taille qui déplace ou chevauche du contenu voisin.
- **Un effet de "chiffres aléatoires qui défilent" (slot machine / scramble) lit comme un bug**, pas comme une touche tech, même bref et subtil — retenu comme jugement utilisateur explicite, à éviter.
- **Toujours regarder le vrai fichier image avant de décider de le changer/supprimer** — ne jamais se fier à un `alt` ou un nom de fichier périmés (la photo FAQ avait `alt="A woman in a black top..."` mais était en réalité une vraie photo d'équipe au bord du lac).
- **Ne jamais faire cohabiter un `:hover` CSS pur et un `.is-open` piloté en JS pour la même mécanique d'ouverture** — ce sont deux sources de vérité indépendantes qui peuvent chacune ouvrir un élément différent en même temps (ex. Services : survol CSS sur un panneau + clic JS qui en épingle un autre = deux panneaux ouverts simultanément quand la souris passe vite de l'un à l'autre). Router hover ET clic à travers la même fonction JS (`mouseenter` + `click` qui appellent toutes deux la même fonction "n'ouvre que celui-ci, ferme tous les autres") garantit qu'un seul élément est ouvert à la fois, par construction.
- **Ouverture et fermeture peuvent avoir des rythmes différents** en déclarant `transition` avec une durée sur la règle de base (s'applique en sortie d'état) et une autre durée sur la règle modificatrice `.is-open`/`.is-active` (s'applique en entrée) — utile quand l'ouverture doit être posée/cinématique mais la fermeture rapide (ou l'inverse).
- **Toujours vérifier avec Playwright** avant de considérer une section terminée : desktop (1440×900) + mobile (~390px) + tablette (~834px) + `reducedMotion:'reduce'` + absence d'erreurs console (ignorer le 404 `_vercel/insights/script.js`, normal en local) + confirmer qu'aucune ancienne classe Webflow morte ne traîne dans le DOM.

## Sections déjà conçues (référence concrète)

- **Alice** (vidéo) : écrin noir, vidéo contenue et centrée, présentation éditoriale label/œuvre/légende.
- **Pourquoi Nous** : scroll immersif plein écran épinglé, un point à la fois (ancrages 01/02/03 en mono), repli en liste statique empilée sur mobile/`reduced-motion`.
- **Services** : accordéon horizontal une ligne à hauteur fixe (la page ne s'étire jamais), carte "verre liquide" sur photo plein cadre au survol/clic, aucun panneau ouvert par défaut. Ouverture volontairement plus lente (1.1s) que la fermeture (0.6s, inchangée) pour un rythme plus posé ; survol et clic passent tous les deux par la même fonction JS (une seule source de vérité, un seul panneau ouvert à la fois garanti) ; le clic "épingle" un panneau qui reste ouvert même après le clic.
- **FAQ** : titre compact en haut, questions à gauche / photo à droite en proportion nombre d'or, la photo déborde à droite (coins arrondis uniformes) et se floute pour révéler la réponse en surimpression justifiée à gauche ; couleur "sea" propre à cette section.
- **Footer** : fond noir, wordmark "verre liquide" interactif (contour qui se remplit au curseur, anime idle en vague, sert aussi de bouton retour-en-haut), carte crédit "ami du collectif" cachée révélée au survol.
