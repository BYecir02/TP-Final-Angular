# Branche `feature/current-weather`

Responsable : **Chebbour Badreddine**

## Objectif

Afficher la météo actuelle de la ville présente dans la route `/weather/:city` en utilisant HttpClient dans un service Angular dédié.

Cette partie gère aussi l'état de chargement et les erreurs demandées dans l'énoncé.

## Fichiers autorisés

- `src/app/features/current-weather/`
- `src/app/pages/weather/`
- `src/app/core/models/current-weather.model.ts`
- `src/app/core/services/current-weather.service.ts`

Ne pas modifier `app.routes.ts`, `app.config.ts`, `styles.css`, `package.json` ou le README principal. `provideHttpClient()` est déjà configuré dans la fondation.

## Fichiers à créer

```text
src/app/core/models/current-weather.model.ts
src/app/core/services/current-weather.service.ts
src/app/features/current-weather/weather-card/
|-- weather-card.component.ts
|-- weather-card.component.html
|-- weather-card.component.css
`-- weather-card.component.spec.ts
```

## Modèle conseillé

Le composant ne doit pas dépendre directement de toute la réponse brute OpenWeather. Créer un modèle simple destiné à l'interface :

```ts
export interface CurrentWeather {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}
```

Un second type peut représenter uniquement les champs utiles de la réponse JSON brute.

## Service attendu

- Utiliser `@Injectable({ providedIn: 'root' })`.
- Injecter HttpClient avec `inject(HttpClient)`.
- Lire l'URL et la clé depuis `environment.ts`.
- Retourner un `Observable<CurrentWeather>`.
- Ne jamais appeler `subscribe()` dans le service.
- Utiliser les paramètres `q`, `appid`, `units=metric` et `lang=fr`.
- Transformer la réponse brute avec l'opérateur `map`.

Signature conseillée :

```ts
getCurrentWeather(city: string): Observable<CurrentWeather>
```

La vraie clé API ne doit jamais être ajoutée à Git.

## Page météo

1. Injecter `ActivatedRoute` et le service avec `inject()`.
2. Lire `paramMap` et récupérer `city`.
3. Utiliser `distinctUntilChanged()` pour éviter les doublons.
4. Utiliser `switchMap()` pour annuler une ancienne requête si la ville change.
5. Gérer les états `loading`, `data` et `error` de manière cohérente.
6. Utiliser le pipe `async` lorsque cela reste lisible.
7. Afficher le composant `WeatherCardComponent` uniquement lorsque les données existent.

Messages obligatoires :

- ville inexistante : `Ville introuvable.`
- erreur générale : `Impossible de récupérer les données météo.`
- erreur 429 : `Trop de requêtes, veuillez réessayer dans quelques instants.`
- chargement : `Chargement de la météo...`

## Données à afficher

- ville et pays
- température actuelle en degrés Celsius
- température ressentie
- description météo
- humidité
- vitesse du vent
- icône météo

## Critères de validation

- Aucun appel HttpClient n'est présent dans un composant.
- Aucune donnée météo n'est codée en dur.
- Les réponses sont typées.
- Une nouvelle ville annule la requête précédente.
- Le chargement se termine aussi en cas d'erreur.
- Les erreurs 404, 429 et génériques sont distinguées.
- Le service et les composants possèdent des tests.

## Convention des commits

Utiliser le format Conventional Commits :

```text
<type>(weather): <description courte>
```

Types autorisés : `feat`, `fix`, `refactor`, `test`, `docs`, `style` et `chore`.

Exemples :

```text
feat(weather): ajoute le service de météo actuelle
feat(weather): affiche les données de la ville recherchée
fix(weather): gère les erreurs 404 et 429
test(weather): vérifie la transformation de la réponse API
```

Chaque commit doit contenir une modification cohérente. La description commence par un verbe au présent, reste courte et ne se termine pas par un point. Ne jamais placer la clé API dans un message ou dans les fichiers du commit.

## Avant la Pull Request

```bash
npm run build
npm test -- --watch=false
git fetch origin
git merge origin/develop
git push
```

La Pull Request doit cibler `develop`.
