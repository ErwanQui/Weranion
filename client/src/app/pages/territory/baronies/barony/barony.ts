import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TerritoryService } from '../../../../services/territory.service';

@Component({
  selector: 'app-barony',
  imports: [],
  templateUrl: './barony.html',
  styleUrl: './barony.css',
})
export class Barony implements OnInit {

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
      this.territoryService.getBarony(params['id']).subscribe(barony => {
        console.log('Received barony:', barony);
      });
      // const id = params['id'];
      // console.log('Barony ID from route:', id);
    });
  }
}
