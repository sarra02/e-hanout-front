import { Component, OnInit } from '@angular/core';
import {Client} from '../shared/models/client.model';
import {AuthenticationService} from '../shared/services/authentication.service';
import {CaddyService} from '../shared/services/caddy.service';
import {Router} from '@angular/router';
import {OrderService} from '../shared/services/order.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public mode:number=0;
  panelStyle:string= "panel-default";
  constructor(public orderService:OrderService,
              private authService:AuthenticationService,
              public caddyService:CaddyService,
              private router:Router) { }

  ngOnInit() {
  }

  onSaveClient(client:Client) {
    client.username=this.authService.authenticatedUser.username;
    this.orderService.setClient(client);
    this.caddyService.setClient(client);
    this.orderService.loadProductsFromCaddy();
    this.mode=1;
  }

  onOrder() {
    this.orderService.submitOrder().subscribe(data=>{
      this.orderService.order.id=data['id'];
      this.orderService.order.date=data['date'];
      this.panelStyle="panel-success";
    },err=>{
      console.log(err);
    });
  }

  onPayOrder() {
    this.router.navigateByUrl("/payment/"+this.orderService.order.id);
  }

}
