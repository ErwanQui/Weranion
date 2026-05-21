import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { PersonSkeleton } from '../../../models/person.models';
import { Duchy } from '../../../models/territory.models';
import { PersonService } from '../../../services/people.service';
import { TerritoryService } from '../../../services/territory.service';

@Component({
  selector: 'app-person',
  imports: [MatSelectModule, CommonModule, FormsModule],
  templateUrl: './person.html',
  styleUrl: './person.css',
})
export class PersonPage implements OnInit {
  /** The person */
  protected currentPerson: WritableSignal<Partial<PersonSkeleton>> = signal<Partial<PersonSkeleton>>({});

  protected duchies$!: Observable<Duchy[]>;

  protected editMode!: boolean;

  /** Constructor of PersonPage
   *
   * @param route Used to get route params
   * @param territoryService Handle territories actions
   * @param personService Handle people actions,
   */
  constructor(
    private route: ActivatedRoute,
    private territoryService: TerritoryService,
    private personService: PersonService
  ) {
    this.duchies$ = this.territoryService.getDuchiesObservable();
  }

  /** PersonPage init */
  ngOnInit(): void {
    const id: string = this.route.snapshot.params['id'];
    const creationMode = !id;
    if (!creationMode) {
      this.editMode = false;
      console.log('Received route params id:', id);
      // this.currentBarony$ = this.territoryService.getBarony(id).pipe(
      this.personService.getPerson(id).pipe(
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

  /**
   *
   * @param duchy1
   * @param duchy2
   */
  compareDuchy(duchy1: Duchy, duchy2: Duchy): boolean {
    return duchy1?._id === duchy2?._id;
  }
}
