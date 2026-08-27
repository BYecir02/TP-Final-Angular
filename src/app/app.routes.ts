import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WeatherComponent } from './pages/weather/weather.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, title: 'Accueil - Weather App' },
  { path: 'weather/:city', component: WeatherComponent, title: 'Météo - Weather App' },
  { path: 'about', component: AboutComponent, title: 'À propos - Weather App' },
  { path: '**', component: NotFoundComponent, title: 'Page introuvable - Weather App' },
];
