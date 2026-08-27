import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, distinctUntilChanged, filter, map, Observable, of, startWith, switchMap } from 'rxjs';

import { ForecastDay } from '../../../core/models/forecast.model';
import { ForecastService } from '../../../core/services/forecast.service';

type ForecastState =
  | { status: 'loading' }
  | { status: 'success'; forecast: ForecastDay[] }
  | { status: 'error'; message: string };

@Component({
  selector: 'app-forecast-panel',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './forecast-panel.component.html',
  styleUrl: './forecast-panel.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastPanelComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly forecastService = inject(ForecastService);

  readonly forecastState$: Observable<ForecastState> = this.route.paramMap.pipe(
    map((params) => params.get('city') ?? ''),
    filter((city) => city.length > 0),
    distinctUntilChanged(),
    switchMap((city) =>
      this.forecastService.getForecast(city).pipe(
        map((forecast) => ({ status: 'success' as const, forecast })),
        startWith({ status: 'loading' as const }),
        catchError(() =>
          of({
            status: 'error' as const,
            message: 'Impossible de récupérer les prévisions.',
          }),
        ),
      ),
    ),
  );
}
