import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ForecastDay, ForecastEntry, ForecastResponse } from '../models/forecast.model';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.openWeather.apiUrl;
  private readonly apiKey = environment.openWeather.apiKey;

  getForecast(city: string): Observable<ForecastDay[]> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.apiKey)
      .set('units', 'metric')
      .set('lang', 'fr');

    return this.http
      .get<ForecastResponse>(`${this.apiUrl}/forecast`, {
        params,
      })
      .pipe(map((response) => this.groupByDay(response.list ?? [])));
  }

  private groupByDay(entries: ForecastEntry[]): ForecastDay[] {
    const groupedByDay = new Map<
      string,
      {
        temperatures: number[];
        descriptions: string[];
        icons: string[];
      }
    >();

    for (const entry of entries) {
      const date = entry.dt_txt?.split(' ')[0];

      if (!date) {
        continue;
      }

      const current = groupedByDay.get(date) ?? {
        temperatures: [],
        descriptions: [],
        icons: [],
      };

      current.temperatures.push(entry.main?.temp ?? 0);
      current.descriptions.push(entry.weather?.[0]?.description ?? 'Météo');
      current.icons.push(entry.weather?.[0]?.icon ?? '01d');

      groupedByDay.set(date, current);
    }

    return Array.from(groupedByDay.entries())
      .map(([date, values]) => {
        const averageTemperature =
          values.temperatures.reduce((sum, temperature) => sum + temperature, 0) /
          values.temperatures.length;

        const description = this.getMostFrequentValue(values.descriptions) ?? 'Météo';
        const icon = this.getMostFrequentValue(values.icons) ?? '01d';

        return {
          date,
          temperature: Math.round(averageTemperature),
          description,
          icon,
        };
      })
      .sort((first, second) => first.date.localeCompare(second.date))
      .slice(0, 5);
  }

  private getMostFrequentValue(values: string[]): string | null {
    if (values.length === 0) {
      return null;
    }

    const counts = new Map<string, number>();

    for (const value of values) {
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }

    return Array.from(counts.entries()).sort((first, second) => second[1] - first[1])[0][0];
  }
}
