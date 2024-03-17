import { Routes } from '@angular/router';
import { SiteNotFoundComponent } from './site-not-found/site-not-found.component'
import { HomeComponent} from "./home/home.component";

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: SiteNotFoundComponent,
  },
];
