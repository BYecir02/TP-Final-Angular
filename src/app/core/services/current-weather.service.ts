import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CurrentWeather, OpenWeatherCurrentResponse } from '../models/current-weather.model';

@Injectable({ providedIn: 'root' })
export class CurrentWeatherService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${environment.openWeather.apiUrl}/weather`;

  getCurrentWeather(city: string): Observable<CurrentWeather> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', environment.openWeather.apiKey)
      .set('units', 'metric')
      .set('lang', 'fr');

    return this.http.get<OpenWeatherCurrentResponse>(this.endpoint, { params }).pipe(
      map((response) => ({
        city: response.name,
        country: response.sys.country,
        temperature: response.main.temp,
        feelsLike: response.main.feels_like,
        description: response.weather[0]?.description ?? '',
        humidity: response.main.humidity,
        windSpeed: response.wind.speed * 3.6,
        icon: response.weather[0]?.icon ?? '',
      })),
    );
  }
}
