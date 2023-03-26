import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthVotarComponent } from './pages/auth-votar/auth-votar.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    InicioComponent,
    AuthComponent,
    AuthVotarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class HomeModule { }
