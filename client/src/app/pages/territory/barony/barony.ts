import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { BehaviorSubject } from 'rxjs';
import { Barony, BaronyFilters } from '../../../models/city.models';
import { TerritoryService } from '../../../services/territory.service';

@Component({
  selector: 'app-barony',
  imports: [MatFormFieldModule, MatInput, FormsModule, CommonModule],
  templateUrl: './barony.html',
  styleUrl: './barony.css',
})
export class BaronyComponent {
  protected baronies$ = new BehaviorSubject<Barony[]>([]);
  protected baronyFilters: BaronyFilters = {};
  
  /**
   *
   * @param territoryService
   */
  constructor(
    private territoryService: TerritoryService
  ) {}

  /**
   *
   */
  fetchBaronies() {
    console.log('Fetching baronies with filters:', this.baronyFilters);
    this.territoryService.getBaronies(this.baronyFilters).subscribe(baronies => {
      this.baronies$.next(baronies);
    });
  }
}
