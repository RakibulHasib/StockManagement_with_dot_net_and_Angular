import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dashboarddata } from 'src/app/models/dashboard/dashboarddata';
import { ProductStock } from 'src/app/models/dashboard/product-stock.model';
import { IceCreamApiUrl } from 'src/app/models/shared/app-constants';

const endPoint: string = "Common";
@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  constructor(
    private http: HttpClient
  ) { }

  getDashboardData(): Observable<Dashboarddata[]> {
    return this.http.get<Dashboarddata[]>(`${IceCreamApiUrl}/${endPoint}/GetCompanySalesPriceWeekly`);
  }

  getProductStock(companyId: number): Observable<ProductStock[]>{
    return this.http.get<ProductStock[]>(`${IceCreamApiUrl}/${endPoint}/GetProducStock/${companyId}`)
  }
}
