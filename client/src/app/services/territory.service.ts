import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, filter, Observable, shareReplay } from 'rxjs';
import { Barony, BaronyFilters, CityFilters, Duchy, DuchyFilters } from '../models/city.models';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TerritoryService {
  private duchiesSubject: BehaviorSubject<Duchy[]> = new BehaviorSubject<Duchy[]>([]);
  private readonly duchies$: Observable<Duchy[]>;
  private baroniesSubject: BehaviorSubject<Barony[]> = new BehaviorSubject<Barony[]>([]);
  private readonly baronies$: Observable<Barony[]>;

  /**
   *
   * @param httpService
   */
  constructor(
    private httpService: HttpService
  ) {
    this.duchies$ = this.duchiesSubject.asObservable().pipe(
      filter(duchies => !!duchies),
      distinctUntilChanged(),
      shareReplay(1)
    );
    this.baronies$ = this.baroniesSubject.asObservable().pipe(
      filter(baronies => !!baronies),
      distinctUntilChanged(),
      shareReplay(1)
    );

    this.fetchDuchies();
    this.fetchBaronies();
  }

  /**
   *
   * @param duchies
   */
  setDuchies(duchies: Duchy[]) {
    this.duchiesSubject.next(duchies);
  };

  /**
   *
   * @param duchies
   * @param baronies
   */
  setBaronies(baronies: Barony[]) {
    this.baroniesSubject.next(baronies);
  };

  /**
   *
   */
  fetchDuchies() {
    this.getDuchies({}).subscribe(duchies => {
      this.setDuchies(duchies);
    });
  }

  /**
   *
   */
  fetchBaronies() {
    this.getBaronies({}).subscribe(baronies => {
      this.setBaronies(baronies);
    });
  }

  /**
   *
   */
  getDuchiesObservable(): Observable<Duchy[]> {
    return this.duchies$;
  }

  /**
   *
   */
  getBaroniesObservable(): Observable<Barony[]> {
    return this.baronies$;
  }


  /**
   *
   * @param filters
   */
  getCities(filters: CityFilters): Observable<any[]> {
    return this.httpService.get<any[], CityFilters>('territory/cities', filters);
  }

  /**
   *
   * @param filters
   */
  getDuchies(filters: DuchyFilters): Observable<any[]> {
    return this.httpService.get<any[], DuchyFilters>('territory/duchies', filters);
  }

  /**
   *
   * @param filters
   */
  getBaronies(filters: BaronyFilters): Observable<any[]> {
    return this.httpService.get<any[], BaronyFilters>('territory/baronies', filters);
  }
}