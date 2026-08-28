import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { CurrentWeather } from '../../../core/models/current-weather.model';

@Component({
  selector: 'app-weather-card',
  imports: [DecimalPipe],
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherCardComponent {
  readonly weather = input.required<CurrentWeather>();

  get iconUrl(): string {
    return `https://openweathermap.org/img/wn/${this.weather().icon}@2x.png`;
  }
}
