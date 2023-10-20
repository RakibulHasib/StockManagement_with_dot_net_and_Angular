import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dailydatadbmodel } from '../../models/DailyDataModel/dailydatadbmodel';
import { IceCreamApiUrl } from '../../models/shared/app-constants';
import { Stock } from '../../models/Stock/Stock';
import { StockReportModel } from '../../models/Stock/stock-report';

const endPoint: string = "Stock";

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${IceCreamApiUrl}/${endPoint}/`);
  }

  getProducts(): Observable<Stock[]> {
    return this.http.get<Stock[]>(`${IceCreamApiUrl}/${endPoint}/`);
  }
  getDashboardDataPerDay(companyId: number, startDate: string, endDate: string): Observable<Dailydatadbmodel[]> {
    return this.http.get<Dailydatadbmodel[]>(`${IceCreamApiUrl}/${endPoint}/GetStockDataPerDay?CompanyId=${companyId}&StartDate=${startDate}&EndDate=${endDate}`);
  }
  getReportData(stockID: number): Observable<StockReportModel[]> {
    return this.http.get<StockReportModel[]>(`${IceCreamApiUrl}/${endPoint}/GetReport?StockId=${stockID}`);
  }

  getById(id: number): Observable<Stock> {
    return this.http.get<Stock>(`${IceCreamApiUrl}/${endPoint}/${id}`);
  }
  insert(companyId: number, data: Stock[]): Observable<Stock[]> {
    return this.http.post<Stock[]>(`${IceCreamApiUrl}/${endPoint}/InsertStockData/${companyId}`, data);
  }
  update(data: Stock): Observable<any> {
    return this.http.put<any>(`${IceCreamApiUrl}/${endPoint}`, data);
  }
  delete(data: Stock): Observable<any> {
    return this.http.delete<any>(`${IceCreamApiUrl}/${endPoint}/${data.productId}`);
  }
}
