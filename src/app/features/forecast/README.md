# Branche `feature/forecast-postman`

Responsable : **AMARI Azeddine**

## Objectif

Créer la fonctionnalité libre obligatoire avec un second endpoint OpenWeather : les prévisions météo à cinq jours. Fournir également une collection Postman claire et réutilisable.

## Fichiers autorisés

- `src/app/features/forecast/`
- `src/app/core/models/forecast.model.ts`
- `src/app/core/services/forecast.service.ts`
- `postman/Weather-App.postman_collection.json`

Ne pas modifier directement `pages/weather/`, `app.routes.ts`, `app.config.ts`, `styles.css`, `package.json` ou le README principal. L'ajout final de `ForecastPanelComponent` dans la page météo sera réalisé par Badirou Mohamed Yecir pendant l'intégration.

## Fichiers à créer

```text
src/app/core/models/forecast.model.ts
src/app/core/services/forecast.service.ts
src/app/features/forecast/forecast-panel/
|-- forecast-panel.component.ts
|-- forecast-panel.component.html
|-- forecast-panel.component.css
`-- forecast-panel.component.spec.ts
postman/Weather-App.postman_collection.json
```

## Modèle conseillé

```ts
export interface ForecastDay {
  date: string;
  temperature: number;
  description: string;
  icon: string;
}
```

Créer un type séparé pour représenter les champs utiles de la réponse brute de l'endpoint de prévisions.

## Service attendu

- Utiliser `@Injectable({ providedIn: 'root' })`.
- Injecter HttpClient avec `inject(HttpClient)`.
- Lire l'URL et la clé dans `environment.ts`.
- Utiliser l'endpoint `/forecast` avec `q`, `appid`, `units=metric` et `lang=fr`.
- Retourner un `Observable<ForecastDay[]>`.
- Transformer la réponse avec `map`.
- Regrouper les données fournies toutes les trois heures afin d'obtenir une valeur représentative par jour.
- Limiter le résultat à cinq jours.
- Ne jamais appeler `subscribe()` dans le service.

Signature conseillée :

```ts
getForecast(city: string): Observable<ForecastDay[]>
```

## Composant de prévisions

Le composant doit être autonome. Il peut récupérer `city` avec `ActivatedRoute`, puis utiliser `distinctUntilChanged()` et `switchMap()` avant d'appeler le service.

Il doit afficher :

- la date ou le jour
- la température
- la description
- l'icône météo
- un état de chargement
- un message si les prévisions ne sont pas disponibles

Dans la Pull Request, préciser à Badirou Mohamed Yecir l'import et la balise nécessaires pour intégrer le composant dans `WeatherComponent`.

## Collection Postman

Créer une collection `Weather App` avec :

- dossier `Current Weather`
- requêtes Paris, Lille et Tokyo
- dossier `Forecast`
- au moins une requête de prévisions
- dossier `Tests`
- variables `{{base_url}}`, `{{api_key}}` et `{{city}}`
- descriptions de la méthode, de l'URL, des paramètres et des données importantes
- tests simples sur le code HTTP et la présence des données attendues

Ne jamais exporter une vraie clé API dans la collection.

## Critères de validation

- Un second endpoint OpenWeather est réellement utilisé.
- Le service retourne un Observable typé.
- L'affichage contient cinq jours maximum.
- Les données ne sont pas codées en dur.
- La collection Postman est importable sans correction manuelle.
- Les variables Postman ne contiennent aucun secret.
- Le service et le composant possèdent des tests.

## Convention des commits

Utiliser le format Conventional Commits :

```text
<type>(forecast): <description courte>
```

Pour la collection Postman, utiliser le scope `postman`.

Types autorisés : `feat`, `fix`, `refactor`, `test`, `docs`, `style` et `chore`.

Exemples :

```text
feat(forecast): ajoute le service de prévisions
feat(forecast): affiche les prévisions à cinq jours
test(forecast): vérifie le regroupement quotidien
docs(postman): documente les requêtes OpenWeather
```

Chaque commit doit contenir une modification cohérente. La description commence par un verbe au présent, reste courte et ne se termine pas par un point. Ne jamais placer la clé API dans un message, une collection Postman ou les fichiers du commit.

## Avant la Pull Request

```bash
npm run build
npm test -- --watch=false
git fetch origin
git merge origin/develop
git push
```

La Pull Request doit cibler `develop`.
