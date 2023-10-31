import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { IceCreamApiUrl } from '../../models/shared/app-constants';
import { Company } from '../../models/company/company';
const endPoint: string = "Company";
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Company[]> {
    return this.http.get<Company[]>(`${IceCreamApiUrl}/${endPoint}/`);
  }


  //
  getCompany(): Observable<Company[]> {
    return this.http.get<Company[]>(`${IceCreamApiUrl}/${endPoint}/CompanyDashboard`);
  }

  //getById(productId: number): Observable<Company> {
  //  return this.http.get<Company>(`${IceCreamApiUrl}/${endPoint}/GetProductByID/${productId}`);
  //}
  //insert(data: Company): Observable<Company> {
  //  return this.http.post<Company>(`${IceCreamApiUrl}/${endPoint}/InsertNewProduct`, data);
  //}
  //update(data: Company): Observable<any> {
  //  return this.http.put<any>(`${IceCreamApiUrl}/${endPoint}/UpdateProduct`, data);
  //}
  //delete(data: Company): Observable<any> {
  //  return this.http.delete<any>(`${IceCreamApiUrl}/${endPoint}/DeleteProduct/${data}`);
  //}
}
