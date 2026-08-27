import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../environments/environment';
import { OpenWeatherCurrentResponse } from '../models/current-weather.model';
import { CurrentWeatherService } from './current-weather.service';

describe('CurrentWeatherService', () => {
  let service: CurrentWeatherService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(CurrentWeatherService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('transforme la réponse OpenWeather et envoie les paramètres attendus', () => {
    const apiResponse: OpenWeatherCurrentResponse = {
      name: 'Paris',
      sys: { country: 'FR' },
      main: { temp: 18.4, feels_like: 17.9, humidity: 64 },
      weather: [{ description: 'ciel dégagé', icon: '01d' }],
      wind: { speed: 3.6 },
    };

    service.getCurrentWeather('Paris').subscribe((weather) => {
      expect(weather).toEqual({
        city: 'Paris',
        country: 'FR',
        temperature: 18.4,
        feelsLike: 17.9,
        description: 'ciel dégagé',
        humidity: 64,
        windSpeed: 3.6,
        icon: '01d',
      });
    });

    const request = httpTesting.expectOne(
      (candidate) => candidate.url === `${environment.openWeather.apiUrl}/weather`,
    );
    expect(request.request.method).toBe('GET');
    expect(request.request.params.get('q')).toBe('Paris');
    expect(request.request.params.get('appid')).toBe(environment.openWeather.apiKey);
    expect(request.request.params.get('units')).toBe('metric');
    expect(request.request.params.get('lang')).toBe('fr');
    request.flush(apiResponse);
  });
});
