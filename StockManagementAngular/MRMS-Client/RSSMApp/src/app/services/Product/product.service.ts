import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IceCreamApiUrl } from '../../models/shared/app-constants';
import { Stock } from '../../models/Stock/Stock';
import { Product } from '../../models/Product/product';

const endPoint : string = "Products";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${IceCreamApiUrl}/${endPoint}/`);
  }

  getProductsWithEja(companyId: number): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${IceCreamApiUrl}/${endPoint}/${companyId}`);
  }

  //
  getProductsListCompanyWise(companyId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${IceCreamApiUrl}/${endPoint}/ProductDashboard/${companyId}`);
  }

   getById(productId: number): Observable<Product> {
     return this.http.get<Product>(`${IceCreamApiUrl}/${endPoint}/GetProductByID/${productId}`);
   }
   insert(data: Product): Observable<Product> {
     return this.http.post<Product>(`${IceCreamApiUrl}/${endPoint}/InsertNewProduct`, data);
   }
   update(data: Product): Observable<any> {
     return this.http.put<any>(`${IceCreamApiUrl}/${endPoint}/UpdateProduct`, data);
   }
   delete(productId:number ,data: any): Observable<any> {
     return this.http.put<any>(`${IceCreamApiUrl}/${endPoint}/delete-product/${productId}`,data);
   }

}
