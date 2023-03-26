import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PandelAdministrarComponent } from './pages/pandel-administrar/pandel-administrar.component';
import { PanelComponent } from './pages/panel/panel.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: PanelComponent
      },
      {
        path: 'administrar',
        component: PandelAdministrarComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelVotarRoutingModule { }
