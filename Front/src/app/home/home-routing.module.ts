import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthVotarComponent } from './pages/auth-votar/auth-votar.component';
import { AuthComponent } from './pages/auth/auth.component';
import { InicioComponent } from './pages/inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: InicioComponent
      },
      {
        path: 'in',
        component: AuthComponent
      },
      {
        path: 'invotar',
        component: AuthVotarComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
