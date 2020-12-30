import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  public host = 'http://localhost:8080';
  constructor(private  http: HttpClient) { }
  public getResource(url)  {
    return this.http.get(this.host + url);
  }

  uploadPhotoProduct(file: File, idProduct): Observable<HttpEvent<{}>> {
    let formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.host}/uploadPhoto/${idProduct}`, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
}
