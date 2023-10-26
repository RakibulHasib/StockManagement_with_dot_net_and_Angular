import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/Product/product';
import { SalesDistribution } from '../../models/sales/sales-distribution';
import { IceCreamApiUrl } from '../../models/shared/app-constants';


  const endPoint: string = "SalesDistribute";

@Injectable({
  providedIn: 'root'
})
export class SalesDistributionService {

  constructor(
    private http: HttpClient
  ) { }

  //getSalesDistributeDataPerDay(startDate: string, endDate: string): Observable<Dailydatadbmodel[]> {
  //  return this.http.get<Dailydatadbmodel[]>(`${IceCreamApiUrl}/${endPoint}/GetStockDataPerDay?CompanyId=${companyId}&StartDate=${startDate}&EndDate=${endDate}`);
  //}
  //getReportData(stockID: number): Observable<stockReportDataModel> {
  //  return this.http.get<stockReportDataModel>(`${IceCreamApiUrl}/${endPoint}/GetReport?StockId=${stockID}`);
  //}

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${IceCreamApiUrl}/${endPoint}/GetProduct`);
  }
  insert(data: SalesDistribution[]): Observable<SalesDistribution[]> {
    return this.http.post<SalesDistribution[]>(`${IceCreamApiUrl}/${endPoint}/InsertSalesDistributeData`, data);
  }
}
