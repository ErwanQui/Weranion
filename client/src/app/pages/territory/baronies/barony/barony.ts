import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { BaronySkeleton } from '../../../../models/territory.models';
import { TerritoryService } from '../../../../services/territory.service';

@Component({
  selector: 'app-barony',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './barony.html',
  styleUrl: './barony.css',
})
export class BaronyPage implements OnInit {

  // currentBarony$!: Observable<Barony>;

  // creationMode!: boolean;

  /** The selected history */
  currentBarony: WritableSignal<BaronySkeleton | undefined> = signal<BaronySkeleton | undefined>(undefined);


  /**
   *
   * @param route
   * @param territoryService Handle territories actions
   */
  constructor(
    private route: ActivatedRoute,
    private territoryService: TerritoryService
  ) {}

  /**
   *
   */
  ngOnInit() {
    const id: string = this.route.snapshot.params['id'];
    const creationMode = !id;
    if (!creationMode) {
      console.log('Received route params id:', id);
      // this.currentBarony$ = this.territoryService.getBarony(id).pipe(
      this.territoryService.getBarony(id).pipe(
        tap(barony => {
          console.log(barony);
          this.currentBarony.set(barony);
        })
      ).subscribe();
    } else {
      this.currentBarony.set({
        name: '',
        details: '',
        duchies: []
      });
    }
    // });
    // const id = params['id'];
    // console.log('Barony ID from route:', id);
  }
}
