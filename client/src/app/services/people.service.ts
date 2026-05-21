import { Injectable } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, filter, Observable, shareReplay } from 'rxjs';
import { Person, PersonFilters, PersonSkeleton } from '../models/person.models';
import { Id } from '../models/utils.models';
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

  /** Get a person details
   *
   * @param _id The id
   * @returns The person
   */
  getPerson(_id: string): Observable<Person> {
    return this.httpService.get<Person, Id>('person', { _id });
  }
  
  /**
   *
   * @param newPerson
   */
  createPerson(newPerson: PersonSkeleton): Observable<Person> {
    return this.httpService.create<Person, PersonSkeleton>('person', newPerson);
  };

  /**
   *
   * @param personToUpdate
   */
  updatePerson(personToUpdate: Person): Observable<Person> {
    return this.httpService.update<Person, Person>('person', personToUpdate);
  };
}