# Branche `feature/search-form`

Responsable : **Amine HADDANE**

## Objectif

Créer le formulaire de recherche de ville et connecter la page d'accueil à la route `/weather/:city`.

Cette partie ne doit effectuer aucun appel HTTP. Son rôle s'arrête à valider la saisie, transmettre la ville à la page parente et déclencher la navigation.

## Fichiers autorisés

- `src/app/features/search/`
- `src/app/pages/home/`

Ne pas modifier `app.routes.ts`, `app.config.ts`, `styles.css`, `package.json` ou le README principal. Si une modification partagée semble nécessaire, la décrire dans la Pull Request pour que Badirou Mohamed Yecir l'intègre.

## Composant à créer

Créer un composant standalone, par exemple :

```text
src/app/features/search/search-form/
|-- search-form.component.ts
|-- search-form.component.html
|-- search-form.component.css
`-- search-form.component.spec.ts
```

Le composant importe directement `ReactiveFormsModule` dans son tableau `imports`.

## Comportement attendu

1. Créer un `FormGroup` contenant un `FormControl` nommé `city`.
2. Ajouter `Validators.required`.
3. Afficher `Veuillez saisir une ville.` si le formulaire vide est soumis.
4. Nettoyer la valeur avec `trim()` avant de l'utiliser.
5. Émettre la ville avec `output<string>()`.
6. Dans `HomeComponent`, écouter l'événement puis utiliser `inject(Router)`.
7. Naviguer avec `router.navigate(['/weather', city])`.

Signature conseillée :

```ts
citySubmitted = output<string>();
```

Utilisation attendue dans la page d'accueil :

```html
<app-search-form (citySubmitted)="searchCity($event)" />
```

## Critères de validation

- Le composant est standalone.
- Le champ est obligatoire.
- Une saisie composée uniquement d'espaces est refusée.
- Le message d'erreur demandé est affiché.
- `Paris` conduit à `/weather/Paris`.
- Aucun appel API n'est effectué dans ce composant.
- Les styles restent dans `search-form.component.css` ou `home.component.css`.
- Les tests du formulaire et de l'émission sont ajoutés.

## Convention des commits

Utiliser le format Conventional Commits :

```text
<type>(search): <description courte>
```

Types autorisés : `feat`, `fix`, `refactor`, `test`, `docs`, `style` et `chore`.

Exemples :

```text
feat(search): ajoute le formulaire de recherche
fix(search): refuse une ville composée uniquement d'espaces
test(search): vérifie la validation du champ ville
```

Chaque commit doit contenir une modification cohérente. La description commence par un verbe au présent, reste courte et ne se termine pas par un point. Ne pas utiliser de message vague comme `update` ou `modifications`.

## Avant la Pull Request

```bash
npm run build
npm test -- --watch=false
git fetch origin
git merge origin/develop
git push
```

La Pull Request doit cibler `develop`.
