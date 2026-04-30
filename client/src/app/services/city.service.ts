import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  
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
  getCities(): Observable<any[]> {
    return this.httpService.get<any[]>('city/cities');
  }

  // /**
  //  *
  //  * @param history
  //  */
  // createHistory(history: WeranionHistory) {
  //   return this.httpService.create<WeranionHistory[]>('history', { history });
  // };

  // /**
  //  *
  //  * @param history
  //  */
  // updateHistory(history: WeranionHistory): Observable<WeranionHistory> {
  //   return this.httpService.update<WeranionHistory>('history', { history });
  // };
}