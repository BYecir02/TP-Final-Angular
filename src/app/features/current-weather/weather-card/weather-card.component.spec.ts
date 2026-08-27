import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeather } from '../../../core/models/current-weather.model';
import { WeatherCardComponent } from './weather-card.component';

describe('WeatherCardComponent', () => {
  let fixture: ComponentFixture<WeatherCardComponent>;

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
    await TestBed.configureTestingModule({ imports: [WeatherCardComponent] }).compileComponents();
    fixture = TestBed.createComponent(WeatherCardComponent);
    fixture.componentRef.setInput('weather', weather);
    fixture.detectChanges();
  });

  it('affiche une réponse météo correcte', () => {
    const content = fixture.nativeElement.textContent;
    const icon: HTMLImageElement = fixture.nativeElement.querySelector('img');

    expect(content).toContain('Paris');
    expect(content).toContain('FR');
    expect(content).toContain('18.4 °C');
    expect(content).toContain('17.9 °C');
    expect(content).toContain('ciel dégagé');
    expect(content).toContain('64 %');
    expect(content).toContain('3.6 m/s');
    expect(icon.src).toContain('/01d@2x.png');
    expect(icon.alt).toContain('ciel dégagé');
  });
});
