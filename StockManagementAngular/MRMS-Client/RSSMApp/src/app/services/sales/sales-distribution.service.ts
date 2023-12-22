import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/Product/product';
import { SalesDistribution } from '../../models/sales/sales-distribution';
import { IceCreamApiUrl } from '../../models/shared/app-constants';
import { DailyDistributionModel } from 'src/app/models/DailyDataModel/daily-distribution-model';
import { SalesReportModel } from 'src/app/models/sales/sales-report-model';


  const endPoint: string = "SalesDistribute";

@Injectable({
  providedIn: 'root'
})
export class SalesDistributionService {

  constructor(
    private http: HttpClient
  ) { }

  getSalesDistributeDataPerDay(concernPersonID: number,startDate: string, endDate: string): Observable<DailyDistributionModel[]> {
   return this.http.get<DailyDistributionModel[]>(`${IceCreamApiUrl}/${endPoint}/GetSalesDistributeDataPerDay?ConcernPersonID=${concernPersonID}&StartDate=${startDate}&EndDate=${endDate}`);
  }
  getReportData(salesDistributeID: number): Observable<SalesReportModel> {
   return this.http.get<SalesReportModel>(`${IceCreamApiUrl}/${endPoint}/GetSalesDistributeReport?SalesDistributeId=${salesDistributeID}`);
  }
  getPrice(productID: number): Observable<{ price: number }> {
    return this.http.get<{ price: number }>(`${IceCreamApiUrl}/${endPoint}/GetProductWisePrice?ProductID=${productID}`);
  }
  getRemaining(productID: number,concernPersonID:number): Observable<number> {
    return this.http.get<number>(`${IceCreamApiUrl}/${endPoint}/GetProductWiseRemaining?ProductID=${productID}&ConcernPersonID=${concernPersonID}`);
  }
  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${IceCreamApiUrl}/${endPoint}/GetProduct`);
  }
  insert(data: {concernPersonId: number, salesDistribute: SalesDistribution[]}): Observable<any> {
    return this.http.post<SalesDistribution[]>(`${IceCreamApiUrl}/${endPoint}/InsertSalesDistributeData`, data);
  }
  checkTodayConcernPersonDistribution(concernPersonID: number):Observable<boolean>{
    return this.http.get<boolean>(`${IceCreamApiUrl}/${endPoint}/CheckTodayConcernPersonDistribution?ConcernPersonId=${concernPersonID}`);
  }
}
