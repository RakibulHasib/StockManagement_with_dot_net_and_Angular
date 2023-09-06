import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dailydatadbmodel } from '../../models/DailyDataModel/dailydatadbmodel';
import { Igloo } from '../../models/Igloo/igloo';
import { IceCreamApiUrl } from '../../models/shared/app-constants';

const endPoint: string = "IglooIceCream";
@Injectable({
  providedIn: 'root'
})
export class IglooService {

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Igloo[]> {
    return this.http.get<Igloo[]>(`${IceCreamApiUrl}/${endPoint}/`);
  }

  getProducts(): Observable<Igloo[]> {
    return this.http.get<Igloo[]>(`${IceCreamApiUrl}/${endPoint}/`);
  }
  getIglooDashboardDataPerDay(startDate: string, endDate: string): Observable<Dailydatadbmodel[]> {
    return this.http.get<Dailydatadbmodel[]>(`${IceCreamApiUrl}/${endPoint}/GetIglooDataPerDay?StartDate=${startDate}&EndDate=${endDate}`);
  }

  getById(id: number): Observable<Igloo> {
    return this.http.get<Igloo>(`${IceCreamApiUrl}/${endPoint}/${id}`);
  }
  insert(data: Igloo): Observable<Igloo> {
    return this.http.post<Igloo>(`${IceCreamApiUrl}/${endPoint}/InsertIglooData`, data);
  }
  update(data: Igloo): Observable<any> {
    return this.http.put<any>(`${IceCreamApiUrl}/${endPoint}`, data);
  }
  delete(data: Igloo): Observable<any> {
    return this.http.delete<any>(`${Igloo}/${endPoint}/${data.productId}`);
  }
}
