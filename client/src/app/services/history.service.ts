import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeranionHistory } from '../models/history.models';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  
  /**
   *
   * @param httpService
   */
  constructor(
    private httpService: HttpService
  ) {}


  /**
   *
   */
  getHistories(): Observable<WeranionHistory[]> {
    return this.httpService.get<WeranionHistory[], never>('history');
  }

  /**
   *
   * @param history
   */
  createHistory(history: WeranionHistory) {
    return this.httpService.create<WeranionHistory[], WeranionHistory>('history', history);
  };

  /**
   *
   * @param history
   */
  updateHistory(history: WeranionHistory): Observable<WeranionHistory> {
    return this.httpService.update<WeranionHistory, WeranionHistory>('history', history);
  };
}