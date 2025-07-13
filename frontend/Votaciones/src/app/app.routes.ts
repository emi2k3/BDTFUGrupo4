import { Routes } from '@angular/router';
import { Login } from './paginas/login/login.component';
import { CircuitosComponent } from './paginas/circuitos/circuitos.component';
import { VotarCandidatosComponent } from './paginas/votar-candidatos/votar-candidatos.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth/login',
    component: Login,
    title: 'Login',
  },
  {
    path: 'circuitos',
    component: CircuitosComponent,
    title: 'Circuitos',
  },
  {
    path: 'listas/votar/:id',
    component: VotarCandidatosComponent,
    title: 'Listas',
  },
];
