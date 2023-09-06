import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dailydatadbmodel } from '../../models/DailyDataModel/dailydatadbmodel';
import { Savoy } from '../../models/Savoy/Savoy';
import { IceCreamApiUrl } from '../../models/shared/app-constants';

const endPoint: string = "SavoyIceCreams";

@Injectable({
  providedIn: 'root'
})
export class SavoyService {

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Savoy[]> {
    return this.http.get<Savoy[]>(`${IceCreamApiUrl}/${endPoint}/`);
  }

  getProducts(): Observable<Savoy[]> {
    return this.http.get<Savoy[]>(`${IceCreamApiUrl}/${endPoint}/`);
  }
  getSavoyDashboardDataPerDay(startDate: string, endDate: string): Observable<Dailydatadbmodel[]> {
    return this.http.get<Dailydatadbmodel[]>(`${IceCreamApiUrl}/${endPoint}/GetSavoyDataPerDay?StartDate=${startDate}&EndDate=${endDate}`);
  }

  getById(id: number): Observable<Savoy> {
    return this.http.get<Savoy>(`${IceCreamApiUrl}/${endPoint}/${id}`);
  }
  insert(data: Savoy): Observable<Savoy> {
    return this.http.post<Savoy>(`${IceCreamApiUrl}/${endPoint}/InsertSavoyData`, data);
  }
  update(data: Savoy): Observable<any> {
    return this.http.put<any>(`${IceCreamApiUrl}/${endPoint}`, data);
  }
  delete(data: Savoy): Observable<any> {
    return this.http.delete<any>(`${IceCreamApiUrl}/${endPoint}/${data.productId}`);
  }
}
