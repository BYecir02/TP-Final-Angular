import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { Mock } from 'vitest';

import { CurrentWeather } from '../../core/models/current-weather.model';
import { CurrentWeatherService } from '../../core/services/current-weather.service';
import { WeatherComponent } from './weather.component';

describe('WeatherComponent', () => {
  let fixture: ComponentFixture<WeatherComponent>;
  let getCurrentWeather: Mock<(city: string) => Observable<CurrentWeather>>;

  const paramMap$ = new BehaviorSubject(convertToParamMap({ city: 'Paris' }));
  const weather: CurrentWeather = {
    city: 'Paris',
    country: 'FR',
    temperature: 18.4,
    feelsLike: 17.9,
    description: 'ciel dégagé',
    humidity: 64,
    windSpeed: 3.6,
    icon: '01d',
  };

  beforeEach(async () => {
    getCurrentWeather = vi.fn();

    await TestBed.configureTestingModule({
      imports: [WeatherComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: paramMap$ } },
        { provide: CurrentWeatherService, useValue: { getCurrentWeather } },
      ],
    }).compileComponents();
  });

  function createComponent(response$: Observable<CurrentWeather>): void {
    getCurrentWeather.mockReturnValue(response$);
    fixture = TestBed.createComponent(WeatherComponent);
    fixture.detectChanges();
  }

  it('récupère le paramètre city de la route', () => {
    createComponent(new Subject<CurrentWeather>());

    expect(getCurrentWeather).toHaveBeenCalledWith('Paris');
  });

  it("affiche l'état de chargement pendant la requête", () => {
    createComponent(new Subject<CurrentWeather>());

    expect(fixture.nativeElement.textContent).toContain('Chargement de la météo...');
  });

  it('affiche les données lorsque la réponse est correcte', () => {
    const response$ = new Subject<CurrentWeather>();
    createComponent(response$);

    response$.next(weather);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Paris');
    expect(fixture.nativeElement.querySelector('app-weather-card')).not.toBeNull();
  });

  it('affiche le message dédié pour une erreur 404', () => {
    createComponent(
      throwError(() => new HttpErrorResponse({ status: 404, statusText: 'Not Found' })),
    );

    expect(fixture.nativeElement.textContent).toContain('Ville introuvable.');
  });

  it('affiche le message dédié pour une erreur 429', () => {
    createComponent(
      throwError(() => new HttpErrorResponse({ status: 429, statusText: 'Too Many Requests' })),
    );

    expect(fixture.nativeElement.textContent).toContain(
      'Trop de requêtes, veuillez réessayer dans quelques instants.',
    );
  });

  it('affiche le message général pour les autres erreurs', () => {
    createComponent(
      throwError(() => new HttpErrorResponse({ status: 500, statusText: 'Server Error' })),
    );

    expect(fixture.nativeElement.textContent).toContain(
      'Impossible de récupérer les données météo.',
    );
  });
});
