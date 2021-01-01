import { Component, OnInit } from '@angular/core';
import {ProductItem} from '../shared/models/product-item.model';
import {CatalogueService} from '../shared/services/catalogue.service';
import {CaddyService} from '../shared/services/caddy.service';
import {Caddy} from '../shared/models/caddy.model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/services/authentication.service';

@Component({
  selector: 'app-caddies',
  templateUrl: './caddies.component.html',
  styleUrls: ['./caddies.component.css']
})
export class CaddiesComponent implements OnInit {

  public caddy:Caddy;

  constructor(private catService:CatalogueService, private router:Router,
              private caddyService:CaddyService, private authService:AuthenticationService) { }

  ngOnInit() {
    if(!this.authService.isAuthenticated)
      this.router.navigateByUrl('/login');
    this.caddy=this.caddyService.getCurrentCaddy();
    console.log(this.caddy);
  }



  onRemoveProductFromCaddy(p: ProductItem) {
    this.caddyService.removeProduct(p.id);
  }

  getTotal() {
    return this.caddyService.getTotalCurrentCaddy();
  }

  onNewOrder() {
    this.router.navigateByUrl("/client");
  }

  onAddCaddy() {

    let size=this.caddyService.listCaddies.length;
    let index:number=this.caddyService.listCaddies[size-1].num;
    this.caddyService.addNewCaddy({num:index+1,name:"Caddy"+(index+1)});
  }

  onSelectCaddy(c: { num: number; name: string }) {
    this.caddyService.currentCaddyName=c.name;
    this.caddy=this.caddyService.getCurrentCaddy();
  }

}
