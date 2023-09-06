import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Savoy } from 'src/app/models/Savoy/Savoy';
import { IceCreamApiUrl } from '../../models/shared/app-constants';

const endPoint : string = "Products";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Savoy[]> {
    return this.http.get<Savoy[]>(`${IceCreamApiUrl}/${endPoint}/`);
  }

  getProductsWithEja(companyId: number): Observable<Savoy[]> {
    return this.http.get<Savoy[]>(`${IceCreamApiUrl}/${endPoint}/${companyId}`);
  }

  // getById(id: number): Observable<Product> {
  //   return this.http.get<Product>(`${SavoyApiUrl}/${endPoint}/${id}`);
  // }
  // insert(data: Product): Observable<Product> {
  //   return this.http.post<Product>(`${SavoyApiUrl}/${endPoint}`, data);
  // }
  // update(data: Product): Observable<any> {
  //   return this.http.put<any>(`${SavoyApiUrl}/${endPoint}`, data);
  // }
  // delete(data: Product): Observable<any> {
  //   return this.http.delete<any>(`${SavoyApiUrl}/${endPoint}/${data.productId}`);
  // }

}
