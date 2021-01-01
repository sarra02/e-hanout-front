import { Component, OnInit } from '@angular/core';
import {CatalogueService} from '../shared/services/catalogue.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {AuthenticationService} from '../shared/services/authentication.service';
import {Product} from '../shared/models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products;
  private editPhoto: boolean;
  private currentProduct: any;
  private selectedFiles;
  private progress: number;
  private currentFileUpload;
  private currentTime;
  private title: String;

  constructor(private catService: CatalogueService,
              private route: ActivatedRoute, private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        let url = val.url;
        console.log(url);
        let p1 = this.route.snapshot.params.p1;
        if (p1 == 1) {
          this.title = "Sélection";
          this.getProducts("/products/search/selectedProducts");

        } else if (p1 == 2) {

          let idCat = this.route.snapshot.params.p2;
          this.title = "Catégorie"+ idCat;
          this.getProducts(`/categories/${idCat}/products`);
        } else if (p1 == 3) {
          this.title = "Produits en promotion";
          this.getProducts("/products/search/promoProducts");
        } else if (p1 == 4) {
          this.title = "Produits disponibles";
          this.getProducts("/products/search/dispoProducts");
        } else if (p1 == 5) {
          this.title = "Recherche..";
          this.getProducts("/products/search/selectedProducts");
        }
      }
    });
    let p1 = this.route.snapshot.params.p1;
    if (p1 == 1) {
      this.getProducts("/products/search/selectedProducts");
    }
  }

  private getProducts(url: String) {
  this.catService.getResource(url)
    .subscribe(data => {
      this.products = data
    }, error => {
      console.log(error);
    })
  }

  onEditPhoto(p) {
    this.currentProduct = p;
    this.editPhoto = true;
  }

  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.currentTime=Date.now();
      }
    },err=>{
      alert("Problème de chargement");
    });
    this.selectedFiles = undefined
  }

  getTS() {
    return this.currentTime;
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  onAddProductToCaddy(p: any) {

  }

  onProductDetails(p: Product) {
    let url = btoa(p._links.product.href);
    this.router.navigateByUrl(`product-details/${url}`);
  }
}
