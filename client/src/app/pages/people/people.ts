import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person, PersonFilters } from '../../models/person.models';
import { Duchy } from '../../models/territory.models';
import { NavigationService } from '../../services/navigation.service';
import { PersonService } from '../../services/people.service';
import { TerritoryService } from '../../services/territory.service';

@Component({
  selector: 'app-people',
  imports: [MatFormFieldModule, MatButtonModule, MatInput, FormsModule, MatIcon, MatSelectModule, CommonModule, MatCheckboxModule],
  templateUrl: './people.html',
  styleUrl: './people.css',
})
export class PeoplePage implements OnInit {

  protected personFilters: PersonFilters = {};
  protected duchies$!: Observable<Duchy[]>;

  protected people$: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);

  /** Constructor of PeoplePage
   *
   * @param territoryService Handle territories actions
   * @param personService Handle people actions
   * @param navigationService Handle the navigation
   */
  constructor(
    private territoryService: TerritoryService,
    private personService: PersonService,
    private navigationService: NavigationService
  ) {
  }

  /** PeoplePage init */
  ngOnInit(): void {
    this.duchies$ = this.territoryService.getDuchiesObservable();
    this.fetchPeople();

  }

  /** Fetch people using filters */
  fetchPeople(): void {
    this.personService.getPeople(this.personFilters).subscribe(people => {
      // this.people = people;
      console.log(people);
      this.people$.next(people);
    });
  }

  /** Navigate to the page of a choosen person
   *
   * @param id The id of the person
   */
  navigateToPerson(id: string): void {
    this.navigationService.navigateTo(`app/people/person/${id}`);
  }

  /** Open an empty person page to add a person */
  addPerson(): void {
    this.navigationService.navigateTo('app/people/person');
  }
}
