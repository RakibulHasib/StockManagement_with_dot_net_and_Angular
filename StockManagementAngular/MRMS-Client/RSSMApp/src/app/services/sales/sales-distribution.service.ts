import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DistributeProductInfo, Product } from '../../models/Product/product';
import { SalesDistribution } from '../../models/sales/sales-distribution';
import { IceCreamApiUrl } from '../../models/shared/app-constants';
import { DailyDistributionModel } from 'src/app/models/DailyDataModel/daily-distribution-model';
import { SalesReportModel } from 'src/app/models/sales/sales-report-model';
import { DailyDistributeStatus } from 'src/app/models/dailydistributeStatus/daily-distribute-status.model';


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
  getDistributeStatus(date: string): Observable<DailyDistributeStatus[]> {
    return this.http.get<DailyDistributeStatus[]>(`${IceCreamApiUrl}/${endPoint}/GetDistributorStatus?date=${date}`);
  }
  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`${IceCreamApiUrl}/${endPoint}/GetProduct`);
  }
  getProductByCompanyId(companyId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${IceCreamApiUrl}/${endPoint}/GetProduct/${companyId}`);
  }
  GetProductInfoByConcernPerson(concernPersonId: number, companyId: number): Observable<DistributeProductInfo[]> {
    return this.http.get<DistributeProductInfo[]>(`${IceCreamApiUrl}/${endPoint}/GetProductInfoByConcernPerson/${concernPersonId}/${companyId}`);
  }
  insert(data: {concernPersonId: number, salesDistribute: SalesDistribution[]}): Observable<any> {
    return this.http.post<SalesDistribution[]>(`${IceCreamApiUrl}/${endPoint}/InsertSalesDistributeData`, data);
  }
  insertSkipConcerPersonDistribution(concernPersonId: number, data?: null): Observable<any> {
    return this.http.post<SalesDistribution[]>(`${IceCreamApiUrl}/${endPoint}/InsertSkipConcerPersonDistribution?ConcernPersonID=${concernPersonId}`, data);
  }
  checkTodayConcernPersonDistribution(concernPersonID: number):Observable<boolean>{
    return this.http.get<boolean>(`${IceCreamApiUrl}/${endPoint}/CheckTodayConcernPersonDistribution?ConcernPersonId=${concernPersonID}`);
  }
  getDistributionById(salesDistributeID: number): Observable<{concernPersonID: number, salesDistribute: SalesDistribution[]}> {
    return this.http.get<{concernPersonID: number, salesDistribute: SalesDistribution[]}>(`${IceCreamApiUrl}/${endPoint}/GetDistributeDataByID?SalesDistributeId=${salesDistributeID}`);
  }
  deleteDistribution(salesDistributeId: number): Observable<any> {
    const Qparams={salesDistributeId:salesDistributeId}
    const options={params:Qparams}
    return this.http.put<any>(`${IceCreamApiUrl}/${endPoint}/DeleteDistribution`,null,options);
  }
}
