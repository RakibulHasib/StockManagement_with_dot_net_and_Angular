import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dailydatadbmodel } from '../../models/DailyDataModel/dailydatadbmodel';
import { IceCreamApiUrl } from '../../models/shared/app-constants';
import { Stock } from '../../models/Stock/Stock';
import { stockReportDataModel} from '../../models/Stock/stock-report';


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
  getReportData(stockID: number): Observable<stockReportDataModel> {
    return this.http.get<stockReportDataModel>(`${IceCreamApiUrl}/${endPoint}/GetReport?StockId=${stockID}`);
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
  updateDamage(stockId: number, damageAmount: number,): Observable<number> {
    const Qparams={stockId:stockId,damageAmount:damageAmount}
    const options={params:Qparams}
    return this.http.put<any>(`${IceCreamApiUrl}/${endPoint}/UpdateDamage`,null,options);
  }
  getDamageById(stockId: number): Observable<number> {
    return this.http.get<number>(`${IceCreamApiUrl}/${endPoint}/GetDamageAmountByID?StockId=${stockId}`);
  }
  updateCommission(stockId: number, commission: number,): Observable<number> {
    const Qparams={stockId:stockId,commission:commission}
    const options={params:Qparams}
    return this.http.put<any>(`${IceCreamApiUrl}/${endPoint}/UpdateSRCommission`,null,options);
  }
  getCommissionById(stockId: number): Observable<number> {
    return this.http.get<number>(`${IceCreamApiUrl}/${endPoint}/GetCommissionByID?StockId=${stockId}`);
  }
  delete(data: Stock): Observable<any> {
    return this.http.delete<any>(`${IceCreamApiUrl}/${endPoint}/${data.productId}`);
  }
}
