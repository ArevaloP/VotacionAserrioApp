import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { LaodingPanelComponent } from './laoding-panel/laoding-panel.component';



@NgModule({
  declarations: [
    LoadingComponent,
    LaodingPanelComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    LaodingPanelComponent
  ]
})
export class SharedModule { }
