import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)},
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'product-details/:url', loadChildren: () => import('./product/product.module').then(m => m.ProductModule)},
  {path: 'caddies', loadChildren: () => import('./caddies/caddies.module').then(m => m.CaddiesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
