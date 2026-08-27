# Weather App

Application de météo réalisée en groupe avec Angular et l'API REST OpenWeather.

Ce dépôt contient pour l'instant la fondation commune : configuration Angular, navigation, routes et emplacements réservés aux fonctionnalités développées sur les autres branches.

## Technologies

- Angular 21 et TypeScript
- composants standalone
- Angular Router
- Reactive Forms
- HttpClient et RxJS
- HTML et CSS
- OpenWeather API
- Postman

> Le support présente Angular 22. Angular 21 est utilisé ici car Node.js 24.12.0 ne satisfait pas la version minimale demandée par Angular CLI 22. Les notions utilisées dans le projet sont identiques à celles du support.

## Prérequis

- Node.js 24.12.0 ou version compatible avec Angular 21
- npm 11 ou version compatible
- une clé API OpenWeather par groupe

## Installation

```bash
npm install
npm start
```

L'application est ensuite disponible sur `http://localhost:4200`.

## Configuration OpenWeather

Copier le fichier d'exemple :

```powershell
Copy-Item src/environments/environment.example.ts src/environments/environment.ts
```

Puis renseigner localement `openWeather.apiKey` dans `environment.ts`.

Le fichier `src/environments/environment.ts` est ignoré par Git. Ne jamais publier la vraie clé API du groupe.

## Routes communes

| Route            | Responsabilité                             |
| ---------------- | ------------------------------------------ |
| `/home`          | accueil et formulaire de recherche         |
| `/weather/:city` | météo de la ville issue du paramètre d'URL |
| `/about`         | présentation du projet et du groupe        |
| `**`             | page 404                                   |

## Architecture

```text
src/app/
|-- core/
|   |-- models/
|   `-- services/
|-- features/
|   |-- current-weather/
|   |-- forecast/
|   `-- search/
|-- pages/
|   |-- about/
|   |-- home/
|   |-- not-found/
|   `-- weather/
`-- shared/
    `-- components/
        `-- navbar/
```

## Répartition des branches

| Membre                    | Branche                    | Responsabilité principale                                                                                                                                     | Fichiers et dossiers possédés                                                                                                     |
| ------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Badirou Mohamed Yecir** | `feature/fondations`       | **Responsable du socle et de l'intégration** : architecture, configuration Angular, routing, navigation, sécurité de la clé API, styles globaux, README et PR | `app.config.ts`, `app.routes.ts`, `app.*`, `main.ts`, `navbar/`, `styles.css`, `.gitignore`, `README.md`                          |
| **Amine HADDANE**         | `feature/search-form`      | formulaire Reactive Forms, validation du champ ville, communication avec `output()` et navigation vers `/weather/:city`                                       | `features/search/`, `pages/home/`                                                                                                 |
| **Chebbour Badreddine**   | `feature/current-weather`  | modèle météo, service HttpClient, récupération de `:city`, météo actuelle, chargement et gestion des erreurs                                                  | `core/models/current-weather.model.ts`, `core/services/current-weather.service.ts`, `features/current-weather/`, `pages/weather/` |
| **AMARI Azeddine**        | `feature/forecast-postman` | fonctionnalité libre de prévisions, second endpoint OpenWeather et collection Postman documentée                                                              | `core/models/forecast.model.ts`, `core/services/forecast.service.ts`, `features/forecast/`, collection Postman                    |

### Règles pour éviter les conflits

- Chaque membre modifie uniquement les fichiers et dossiers attribués à sa branche.
- Les fichiers partagés sont gérés par Badirou Mohamed Yecir sur la branche d'intégration.
- Si une fonctionnalité nécessite une nouvelle route, un provider ou une modification du layout global, le membre l'indique dans sa Pull Request au lieu de modifier directement les fichiers partagés.
- Les styles d'une fonctionnalité restent dans le fichier CSS de son composant ; seul le responsable du socle modifie `src/styles.css`.
- Aucun membre ne modifie `package.json` ou n'ajoute de dépendance sans accord du groupe.
- Les Pull Requests ciblent `develop` et sont intégrées une par une par le responsable du socle.
- Après la fusion de la fondation dans `develop`, chaque membre crée sa branche depuis cette version commune.

## Conventions Angular du cours

- composants standalone avec leurs dépendances dans `imports`
- injection avec `inject()`
- services avec `providedIn: 'root'`
- appels HTTP uniquement dans les services
- données typées avec des interfaces TypeScript
- Reactive Forms pour la recherche
- Observables RxJS et pipe `async` lorsque cela est pertinent
- `ActivatedRoute` pour récupérer `:city`
- `input()` et `output()` pour la communication parent-enfant
- syntaxe `@if` et `@for` dans les templates

## Convention des commits

Tous les membres utilisent le format Conventional Commits :

```text
<type>(<scope>): <description courte>
```

Types autorisés :

- `feat` : ajout d'une fonctionnalité
- `fix` : correction d'un bug
- `refactor` : réorganisation du code sans changer son comportement
- `test` : ajout ou modification de tests
- `docs` : modification de documentation
- `style` : modification de présentation sans changement fonctionnel
- `chore` : configuration, dépendances ou tâches techniques

Scopes recommandés : `foundation`, `search`, `weather`, `forecast`, `postman` et `docs`.

Exemples :

```text
chore(foundation): initialise le projet Angular
feat(search): ajoute le formulaire de recherche
feat(weather): affiche la météo actuelle
fix(weather): gère les erreurs 404 et 429
feat(forecast): ajoute les prévisions à cinq jours
docs(postman): documente la collection OpenWeather
```

Règles communes :

- un commit correspond à une modification cohérente
- la description commence par un verbe au présent
- la description reste courte, claire et sans point final
- ne pas utiliser de messages vagues comme `update`, `modifications` ou `corrections`
- ne jamais mentionner une clé API ou une donnée sensible dans un commit

## Commandes utiles

```bash
npm start
npm run build
npm test
```
