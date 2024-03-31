import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConcernPerson } from 'src/app/models/concernPerson/concern-person';
import { IceCreamApiUrl } from 'src/app/models/shared/app-constants';
const endPoint: string = "ConcernPerson";
@Injectable({
  providedIn: 'root'
})
export class ConcernPersonService {
  
  constructor(
    private http: HttpClient
  ) { }

 
  getConcernPerson(): Observable<ConcernPerson[]> {
    return this.http.get<ConcernPerson[]>(`${IceCreamApiUrl}/${endPoint}/concernPersonDashboard`);
  }

  getConcernPersonById(ConcernPersonById: number): Observable<ConcernPerson> {
   return this.http.get<ConcernPerson>(`${IceCreamApiUrl}/${endPoint}/GetConcernPersonByID/${ConcernPersonById}`);
  }
  insert(data: ConcernPerson): Observable<ConcernPerson> {
   return this.http.post<ConcernPerson>(`${IceCreamApiUrl}/${endPoint}/InsertConcernPerson`, data);
  }
  update(data: ConcernPerson): Observable<any> {
   return this.http.put<any>(`${IceCreamApiUrl}/${endPoint}/UpdateConcernPerson`, data);
  }
  // delete(ConcernPersonById: number): Observable<any> {
  //  return this.http.delete<any>(`${IceCreamApiUrl}/${endPoint}/DeleteConcernPerson/${ConcernPersonById}`);
  // }
  // putConcern(data: number): Observable<any> {
  //   return this.http.put<any>(`${IceCreamApiUrl}/${endPoint}/DeleteConcernPerson/${concernPersonId}`);
  // }

  // delete(concernPersonId: number): Observable<number> {
  //   const Qparams={concernPersonId:concernPersonId}
  //   const options={params:Qparams}
  //   return this.http.put<any>(`${IceCreamApiUrl}/${endPoint}/DeleteConcernPerson/`,null,options);
  // }

  delete(concernPersonId: number, data: any): Observable<any> {
    return this.http.put<any>(`${IceCreamApiUrl}/${endPoint}/DeleteConcernPerson/${concernPersonId}`,data);
   }
}
