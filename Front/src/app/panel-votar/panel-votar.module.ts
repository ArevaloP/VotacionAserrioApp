import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { PanelVotarRoutingModule } from './panel-votar-routing.module';
import { PanelComponent } from './pages/panel/panel.component';
import { PandelAdministrarComponent } from './pages/pandel-administrar/pandel-administrar.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PanelComponent,
    PandelAdministrarComponent
  ],
  imports: [
    CommonModule,
    PanelVotarRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PanelVotarModule { }
