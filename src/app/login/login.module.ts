import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  { path: '', component: LoginComponent}

];

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [],
  providers: []
})
export class LoginModule { }
