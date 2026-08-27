import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-weather',
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherComponent {}
