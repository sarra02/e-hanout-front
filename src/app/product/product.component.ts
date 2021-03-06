import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../shared/models/product.model';
import {CatalogueService} from '../shared/services/catalogue.service';
import {AuthenticationService} from '../shared/services/authentication.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {CaddyService} from '../shared/services/caddy.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public  currentProduct;
  private currentTime: number;
  private selectedFiles;
  private progress: number;
  private currentFileUpload: any;
  private editPhoto: boolean;
  private mode: number=0;

  constructor(private router: Router, private route: ActivatedRoute, private catService: CatalogueService, private authService: AuthenticationService,
              private caddyService: CaddyService) { }

  ngOnInit(): void {
    let url = atob(this.route.snapshot.params.url);
    this.catService.getProduct(url).subscribe(data => {
      this.currentProduct = data;
    }, error => {
      console.log(error);
    });
  }

  onEditPhoto(p) {
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile(event) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime=Date.now();
        this.editPhoto=false;
      }
    },err=>{
      alert("Problème de chargement");
    });

    this.selectedFiles = undefined
  }

  getTS() {
    return this.currentTime;
  }

  onProductDetails(p) {
    this.router.navigateByUrl("/product/"+p.id);
  }

  onEditProduct() {
    this.mode=1;
  }

  onUpdateProduct(data) {
    let url=this.currentProduct._links.self.href;
    this.catService.patchResource(url,data)
      .subscribe(d=>{
        this.currentProduct=d;
        this.mode=0;
      },err=>{
        console.log(err);
      })
  }

  onAddProductToCaddy(p: Product) {
    if(!this.authService.isAuthenticated){
      this.router.navigateByUrl("/login");
    }
    else{
      this.caddyService.addProduct(p);
    }
  }
  isAdmin() {
    return this.authService.isAdmin();
  }
}
