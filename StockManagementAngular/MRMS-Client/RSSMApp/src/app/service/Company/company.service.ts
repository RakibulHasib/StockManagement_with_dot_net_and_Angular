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

  getById(companyId: number): Observable<Company> {
   return this.http.get<Company>(`${IceCreamApiUrl}/${endPoint}/GetCompanyByID/${companyId}`);
  }
  insert(data: Company): Observable<Company> {
   return this.http.post<Company>(`${IceCreamApiUrl}/${endPoint}/InsertNewCompany`, data);
  }
  update(data: any): Observable<any> {
   return this.http.put<any>(`${IceCreamApiUrl}/${endPoint}/UpdateCompany`, data);
  }
  delete(companyId: number,data: any): Observable<any> {
   return this.http.put<any>(`${IceCreamApiUrl}/${endPoint}/DeleteCompany/${companyId}`,data);
  }
}
