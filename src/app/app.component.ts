import {Component, OnInit} from '@angular/core';
import {CatalogueService} from './shared/services/catalogue.service';
import {Router} from '@angular/router';
import {AuthenticationService} from './shared/services/authentication.service';
import {CaddyService} from './shared/services/caddy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'e-hanout-front';
  public  categories;
  private currentCategory;
  constructor(private catService: CatalogueService,
              private router: Router,
              private authService: AuthenticationService,
              private caddyService: CaddyService) {
  }
  ngOnInit(): void {
    this.getCategories();
    this.authService.loadAuthenticatedUserFromLocalStorage();
  }
  private getCategories() {
    this.catService.getResource("/categories").subscribe(
      data => {
        this.categories = data;
      }, error => {
        console.log(error);
      }
    )
  }

  getCategoriesByCat(c) {
    this.currentCategory = c;
    this.router.navigateByUrl(`/products/2/${c.id}`);
  }

  onSelectedProducts() {
    this.currentCategory = undefined;
    this.router.navigateByUrl("/products/1/0");
  }

  onProductsPromo() {
    this.currentCategory = undefined;
    this.router.navigateByUrl("/products/3/0");
  }

  onProductsDispo() {
    this.currentCategory = undefined;
    this.router.navigateByUrl("/products/4/0");
  }

  onLogout() {
    this.caddyService.emptyCaddy();
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl("/login");
  }

  onLogin() {
    this.router.navigateByUrl('/login');
  }
}
