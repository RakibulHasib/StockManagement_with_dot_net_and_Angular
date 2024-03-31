import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private stateHistory: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public stateHistory$: Observable<any[]> = this.stateHistory.asObservable();

  constructor() { }

  updateState(newState: any): void {
    const currentHistory = this.stateHistory.value;
    const updatedHistory = [...currentHistory, newState];
    this.stateHistory.next(updatedHistory);
  }

  getPreviousState(stepsBack: number): any | null {
    const currentHistory = this.stateHistory.value;
    if (stepsBack <= currentHistory.length) {
      return currentHistory[currentHistory.length - stepsBack];
    } else {
      return null;
    }
  }

  resetState(): void {
    this.stateHistory.next([]);
  }
}
