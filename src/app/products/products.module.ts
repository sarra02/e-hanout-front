import { BrowserModule } from '@angular/platform-browser';
import {ProductsComponent} from './products.component';
import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  { path: 'products/:p1/:p2', component: ProductsComponent},
  { path: '', redirectTo: 'products/1/0', pathMatch:'full'}

  ];

@NgModule({
  declarations: [
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [],
  providers: []
})
export class ProductsModule { }
