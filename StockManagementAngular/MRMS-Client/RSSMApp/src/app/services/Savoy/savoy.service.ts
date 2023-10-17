import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dailydatadbmodel } from '../../models/DailyDataModel/dailydatadbmodel';
import { Savoy } from '../../models/Savoy/Savoy';
import { SavoyReportModel } from '../../models/Savoy/savoy-report';
import { IceCreamApiUrl } from '../../models/shared/app-constants';

const endPoint: string = "SavoyIceCreams";

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Savoy[]> {
    return this.http.get<Savoy[]>(`${IceCreamApiUrl}/${endPoint}/`);
  }

  getProducts(): Observable<Savoy[]> {
    return this.http.get<Savoy[]>(`${IceCreamApiUrl}/${endPoint}/`);
  }
  getSavoyDashboardDataPerDay(companyId: number, startDate: string, endDate: string): Observable<Dailydatadbmodel[]> {
    return this.http.get<Dailydatadbmodel[]>(`${IceCreamApiUrl}/${endPoint}/GetSavoyDataPerDay?CompanyId=${companyId}&StartDate=${startDate}&EndDate=${endDate}`);
  }
  getSavoyReportData(savoyIceCreamMasterID: number): Observable<SavoyReportModel[]> {
    return this.http.get<SavoyReportModel[]>(`${IceCreamApiUrl}/${endPoint}/GetSavoyReport?SavoyIceCreamMasterId=${savoyIceCreamMasterID}`);
  }

  getById(id: number): Observable<Savoy> {
    return this.http.get<Savoy>(`${IceCreamApiUrl}/${endPoint}/${id}`);
  }
  insert(companyId : number, data: Savoy[]): Observable<Savoy[]> {
    return this.http.post<Savoy[]>(`${IceCreamApiUrl}/${endPoint}/InsertStockData/${companyId}`, data);
  }
  update(data: Savoy): Observable<any> {
    return this.http.put<any>(`${IceCreamApiUrl}/${endPoint}`, data);
  }
  delete(data: Savoy): Observable<any> {
    return this.http.delete<any>(`${IceCreamApiUrl}/${endPoint}/${data.productId}`);
  }
}
