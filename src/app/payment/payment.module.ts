import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';


const routes: Routes = [
  {path: '', component: PaymentComponent}
]

@NgModule({
  declarations: [PaymentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class PaymentModule { }
