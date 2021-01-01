import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CaddiesComponent} from './caddies.component';

const routes: Routes = [
  {path: '', component: CaddiesComponent}
]

@NgModule({
  declarations: [
    CaddiesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CaddiesModule { }
