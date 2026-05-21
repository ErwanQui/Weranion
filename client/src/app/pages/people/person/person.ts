import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Person, PersonSkeleton } from '../../../models/person.models';
import { Duchy } from '../../../models/territory.models';
import { NavigationService } from '../../../services/navigation.service';
import { PersonService } from '../../../services/people.service';
import { TerritoryService } from '../../../services/territory.service';

@Component({
  selector: 'app-person',
  imports: [MatSelectModule, CommonModule, FormsModule, MatButtonModule, MatIconModule, MatInputModule],
  templateUrl: './person.html',
  styleUrl: './person.css',
})
export class PersonPage implements OnInit {
  /** The person */
  protected currentPerson: WritableSignal<Partial<PersonSkeleton>> = signal<Partial<PersonSkeleton>>({});

  /** The list of existing duchies */
  protected duchies$!: Observable<Duchy[]>;

  /** Whether the page is in edit mode */
  protected editMode!: boolean;

  /** The id of the person */
  protected readonly personId: string;

  /** Constructor of PersonPage
   *
   * @param route Used to get route params
   * @param territoryService Handle territories actions
   * @param personService Handle people actions,
   * @param navigationService Handle the navigation
   */
  constructor(
    private route: ActivatedRoute,
    private territoryService: TerritoryService,
    private personService: PersonService,
    private navigationService: NavigationService
  ) {
    this.duchies$ = this.territoryService.getDuchiesObservable();
    this.personId = this.route.snapshot.params['id'];
  }

  /** PersonPage init */
  ngOnInit(): void {
    const creationMode = !this.personId;
    if (!creationMode) {
      this.editMode = false;
      // console.log('Received route params id:', id);
      // this.currentBarony$ = this.territoryService.getBarony(id).pipe(
      this.personService.getPerson(this.personId).pipe(
        tap(person => {
          console.log(7, person);
          this.currentPerson.set(person);
        })
      ).subscribe();
    } else {
      this.editMode = true;
      this.currentPerson.set({
        name: '',
        age: undefined,
        duchy: undefined,
        details: '',
        alive: true
      });
    }
  }

  /** Compare whether 2 duchies are the same
   *
   * @param duchy1 The first duchy
   * @param duchy2 The second duchy
   * @returns Whether those duchies share the same _id
   */
  compareDuchy(duchy1: Duchy, duchy2: Duchy): boolean {
    return duchy1?._id === duchy2?._id;
  }

  /** Check whether the navigation has history
   *
   * @returns Whether the navigation has history
   */
  hasNavigationHistory(): boolean {
    return this.navigationService.hasHistory();
  }

  /** Navigate to the previous page */
  return(): void {
    this.navigationService.return();
  }

  /** Switch the edit mode */
  switchEditMode(): void {
    this.editMode = !this.editMode;
  }

  /** Create the person */
  createPerson(): void {
    this.personService.createPerson(this.currentPerson() as Person).subscribe(personId => {
      this.navigationService.navigateTo(`app/people/person/${personId}`);
    });
  }

  /** Update the person */
  updatePerson(): void {
    this.personService.updatePerson(this.currentPerson() as Person).subscribe();
  }
}
