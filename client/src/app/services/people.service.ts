import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, filter, Observable, shareReplay } from 'rxjs';
import { Person, PersonFilters } from '../models/person.models';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private peopleSubject: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);
  private readonly people$: Observable<Person[]>;

  /**
   *
   * @param httpService
   */
  constructor(
    private httpService: HttpService
  ) {
    this.people$ = this.peopleSubject.asObservable().pipe(
      filter(people => !!people),
      distinctUntilChanged(),
      shareReplay(1)
    );

    this.fetchPeople();
  }

  /**
   *
   * @param people
   */
  setPeople(people: Person[]) {
    this.peopleSubject.next(people);
  };

  /**
   *
   */
  fetchPeople() {
    this.getPeople({}).subscribe(people => {
      this.setPeople(people);
    });
  }

  /**
   *
   */
  getPeopleObservable(): Observable<Person[]> {
    return this.people$;
  }

  /**
   *
   * @param filters
   */
  getPeople(filters: PersonFilters): Observable<Person[]> {
    return this.httpService.get<Person[], PersonFilters>('person/people', filters);
  }
}