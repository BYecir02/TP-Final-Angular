import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, distinctUntilChanged, map, Observable, of, startWith, switchMap } from 'rxjs';

import { CurrentWeather } from '../../core/models/current-weather.model';
import { CurrentWeatherService } from '../../core/services/current-weather.service';
import { WeatherCardComponent } from '../../features/current-weather/weather-card/weather-card.component';

type WeatherViewState =
  | { status: 'loading' }
  | { status: 'data'; weather: CurrentWeather }
  | { status: 'error'; message: string };

@Component({
  selector: 'app-weather',
  imports: [AsyncPipe, WeatherCardComponent],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly currentWeatherService = inject(CurrentWeatherService);

  readonly state$: Observable<WeatherViewState> = this.route.paramMap.pipe(
    map((params) => params.get('city')?.trim() ?? ''),
    distinctUntilChanged(),
    switchMap((city) => {
      if (!city) {
        return of<WeatherViewState>({
          status: 'error',
          message: 'Impossible de récupérer les données météo.',
        });
      }

      return this.currentWeatherService.getCurrentWeather(city).pipe(
        map((weather): WeatherViewState => ({
          status: 'data',
          weather,
        })),
        startWith<WeatherViewState>({ status: 'loading' }),
        catchError((error: unknown) =>
          of<WeatherViewState>({
            status: 'error',
            message: this.getErrorMessage(error),
          }),
        ),
      );
    }),
  );

  private getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse && error.status === 404) {
      return 'Ville introuvable.';
    }

    if (error instanceof HttpErrorResponse && error.status === 429) {
      return 'Trop de requêtes, veuillez réessayer dans quelques instants.';
    }

    return 'Impossible de récupérer les données météo.';
  }
}
