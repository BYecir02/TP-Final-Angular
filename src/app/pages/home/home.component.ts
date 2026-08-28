import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SearchFormComponent } from '../../features/search/search-form/search-form.component';

@Component({
  selector: 'app-home',
  imports: [SearchFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly router = inject(Router);

  searchCity(city: string): void {
    this.router.navigate(['/weather', city]);
  }
}
