import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DistributeProductInfo, Product } from '../../models/Product/product';
import { SalesDistribution } from '../../models/sales/sales-distribution';
import { IceCreamApiUrl } from '../../models/shared/app-constants';
import { DailyDistributionModel } from 'src/app/models/DailyDataModel/daily-distribution-model';
import { SalesReportModel } from 'src/app/models/sales/sales-report-model';
import { DailyDistributeStatus, SalesDistributeAvailabityDto } from 'src/app/models/dailydistributeStatus/daily-distribute-status.model';


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

  getDistributeStatus(date: string): Observable<DailyDistributeStatus[]> {
    return this.http.get<DailyDistributeStatus[]>(`${IceCreamApiUrl}/${endPoint}/GetDistributorStatus?date=${date}`);
  }

  GetProductInfoByCompany(companyId: number): Observable<DistributeProductInfo[]> {
    return this.http.get<DistributeProductInfo[]>(`${IceCreamApiUrl}/${endPoint}/GetProductInfoByCompany/${companyId}`);
  }

  GetDistributeAvailabilty(concernPersonId: number, companyId: number): Observable<SalesDistributeAvailabityDto> {
    return this.http.get<SalesDistributeAvailabityDto>(`${IceCreamApiUrl}/${endPoint}/GetAvailableDistribute/${concernPersonId}/${companyId}`);
  }
  
  insert(data: {concernPersonId: number, companyId: number, distributionTime: string, salesDistribute: SalesDistribution[]}): Observable<any> {
    return this.http.post<SalesDistribution[]>(`${IceCreamApiUrl}/${endPoint}/InsertSalesDistributeData`, data);
  }

  deleteDistribution(salesDistributeId: number): Observable<any> {
    const Qparams={salesDistributeId:salesDistributeId}
    const options={params:Qparams}
    return this.http.put<any>(`${IceCreamApiUrl}/${endPoint}/DeleteDistribution`,null,options);
  }
}
