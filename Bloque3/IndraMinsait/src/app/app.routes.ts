import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('./components/usuarios/usuarios.component').then(m => m.UsuariosComponent)
  },
  {
    path: 'polizas',
    loadComponent: () =>
      import('./components/polizas/polizas.component').then(m => m.PolizasComponent)
  }
];



