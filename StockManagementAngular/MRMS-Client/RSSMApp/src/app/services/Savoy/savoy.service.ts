import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SavoyApiUrl } from 'src/app/models/shared/app-constants';
import { Dailydatadbmodel } from '../../models/DailyDataModel/dailydatadbmodel';
import { Savoy } from '../../models/Savoy/Savoy';

const endPoint: string = "SavoyIceCreams";

@Injectable({
  providedIn: 'root'
})
export class SavoyService {

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Savoy[]> {
    return this.http.get<Savoy[]>(`${SavoyApiUrl}/${endPoint}/`);
  }

  getProducts(): Observable<Savoy[]> {
    return this.http.get<Savoy[]>(`${SavoyApiUrl}/${endPoint}/`);
  }
  getDashboardDataPerDay(startDate: string, endDate: string): Observable<Dailydatadbmodel[]> {
    return this.http.get<Dailydatadbmodel[]>(`${SavoyApiUrl}/${endPoint}/GetSavoyDataPerDay?StartDate=${startDate}&EndDate=${endDate}`);
  }

  getById(id: number): Observable<Savoy> {
    return this.http.get<Savoy>(`${SavoyApiUrl}/${endPoint}/${id}`);
  }
  insert(data: Savoy): Observable<Savoy> {
    return this.http.post<Savoy>(`${SavoyApiUrl}/${endPoint}/InsertSavoyData`, data);
  }
  update(data: Savoy): Observable<any> {
    return this.http.put<any>(`${SavoyApiUrl}/${endPoint}`, data);
  }
  delete(data: Savoy): Observable<any> {
    return this.http.delete<any>(`${SavoyApiUrl}/${endPoint}/${data.productId}`);
  }
}
