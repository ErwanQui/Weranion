import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Barony } from '../../../../models/territory.models';
import { TerritoryService } from '../../../../services/territory.service';

@Component({
  selector: 'app-barony',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './barony.html',
  styleUrl: './barony.css',
})
export class BaronyPage implements OnInit {

  currentBarony$!: Observable<Barony>;

  /**
   *
   * @param route
   * @param territoryService
   */
  constructor(
    private route: ActivatedRoute,
    private territoryService: TerritoryService
  ) {}

  /**
   *
   */
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log('Received route params:', params);
      this.currentBarony$ = this.territoryService.getBarony(params['id']).pipe(
        tap(data => console.log(data))
      );
    // });
    // const id = params['id'];
    // console.log('Barony ID from route:', id);
    });
  }
}
