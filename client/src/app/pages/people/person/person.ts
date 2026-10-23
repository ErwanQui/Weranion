import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Person, PERSON_KEYS, PersonSkeleton } from '../../../models/person.models';
import { Duchy } from '../../../models/territory.models';
import { ControlsOf } from '../../../models/utils.models';
import { FormService } from '../../../services/form.service';
import { NavigationService } from '../../../services/navigation.service';
import { PersonService } from '../../../services/people.service';
import { TerritoryService } from '../../../services/territory.service';

@Component({
  selector: 'app-person',
  imports: [MatSelectModule, CommonModule, FormsModule, MatButtonModule, MatIconModule, MatInputModule, MatCheckboxModule, ReactiveFormsModule],
  templateUrl: './person.html',
  styleUrl: './person.css',
})
export class PersonPage implements OnInit {
  /** The person */
  protected currentPersonForm: FormGroup<ControlsOf<PersonSkeleton>> | undefined;
  protected currentPerson: WritableSignal<Partial<PersonSkeleton>> = signal<Partial<PersonSkeleton>>({});

  /** The list of existing duchies */
  protected duchies$!: Observable<Duchy[]>;

  /** Whether the page is in edit mode */
  protected editMode: WritableSignal<boolean> = signal(false);

  /** The id of the person */
  protected readonly personId: string;

  /** Constructor of PersonPage
   *
   * @param route Used to get route params
   * @param territoryService Handle territories actions
   * @param personService Handle people actions,
   * @param navigationService Handle the navigation
   * @param formService Handle the forms
   */
  constructor(
    private route: ActivatedRoute,
    private territoryService: TerritoryService,
    private personService: PersonService,
    private navigationService: NavigationService,
    private formService: FormService
  ) {
    this.duchies$ = this.territoryService.getDuchiesObservable();
    this.personId = this.route.snapshot.params['id'];

          
    effect(() => {
      const person = this.currentPerson();
      console.log('current person effect', person);
      if (this.currentPersonForm) {
        console.warn(1);
        this.currentPersonForm.patchValue(person);
        // this.currentPersonForm.patchValue(person, { emitEvent: false });
      } else {
        console.warn(2);
        this.currentPersonForm = this.formService.createForm<PersonSkeleton>(
          PERSON_KEYS,
          person,
          { name: [Validators.required], age: [Validators.required, Validators.min(0)], alive: [Validators.required] }
        );
      }
      console.log('current person FORM', this.currentPersonForm);
    });
  }

  /** PersonPage init */
  ngOnInit(): void {
    const creationMode = !this.personId;
    this.editMode.set(creationMode);
    if (!creationMode) {
      // console.log('Received route params id:', id);
      // this.currentBarony$ = this.territoryService.getBarony(id).pipe(
      this.personService.getPerson(this.personId).pipe(
        tap(person => {
          console.log(7, person);
          // this.currentPersonForm = this.formService.createForm<PersonSkeleton>(
          //   person,
          //   {
          //     name: [Validators.required],
          //     age: [Validators.required, Validators.min(0)],
          //     alive: [Validators.required],
          //   });
          
          this.currentPerson.set(person);
        })
      ).subscribe();
    } else {
      // this.currentPerson.set({
      //   name: '',
      //   age: undefined,
      //   duchy: undefined,
      //   details: '',
      //   alive: true
      // });
      // this.currentPersonForm = this.formService.createForm<PersonSkeleton>({
      //   name: '',
      //   age: undefined,
      //   duchy: undefined,
      //   details: '',
      //   alive: true
      // },
      // {
      //   name: [Validators.required],
      //   age: [Validators.required, Validators.min(0)],
      //   alive: [Validators.required],
      // });
      
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

  // /** Check whether the navigation has history
  //  *
  //  * @returns Whether the navigation has history
  //  */
  // hasNavigationHistory(): boolean {
  //   return this.navigationService.hasHistory();
  // }

  /** Navigate to the previous page */
  return(): void {
    this.navigationService.navigateTo('app/people/');
  }

  /** Switch the edit mode */
  switchEditMode(): void {
    this.editMode.update(value => !value);
  }



  /** Create the person */
  createPerson(): void {
    if (!this.currentPersonForm?.valid) {
      console.error('Form is invalid');
      return;
    }
    console.log('current person', this.currentPersonForm.getRawValue());
    this.personService.createPerson(this.currentPersonForm.getRawValue() as Person).subscribe(personId => {
      console.log('oh c est créé', personId);
      this.navigationService.navigateTo(`app/people/person/${personId}`);
    });
  }

  /** Update the person */
  updatePerson(): void {
    if (!this.currentPersonForm?.valid) {
      console.error('Form is invalid');
      return;
    }
    console.log('current person', this.currentPersonForm.getRawValue());
    this.personService.updatePerson({ ...this.currentPersonForm.getRawValue(), _id: this.personId } as Person).subscribe(() => {
      console.log('oh c est mis à jour');
      this.editMode.set(false);
    });
  }
}
