import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { BehaviorSubject } from 'rxjs';
import { Barony, BaronyFilters } from '../../../models/territory.models';
import { NavigationService } from '../../../services/navigation.service';
import { TerritoryService } from '../../../services/territory.service';

@Component({
  selector: 'app-baronies',
  imports: [MatFormFieldModule, MatInput, FormsModule, CommonModule, MatButtonModule],
  templateUrl: './baronies.html',
  styleUrl: './baronies.css',
})
export class BaroniesComponent {
  protected baronies$: BehaviorSubject<Barony[]> = new BehaviorSubject<Barony[]>([]);
  protected baronyFilters: BaronyFilters = {};
  
  /**
   *
   * @param territoryService
   * @param navigationService
   */
  constructor(
    private territoryService: TerritoryService,
    private navigationService: NavigationService
  ) {
    this.fetchBaronies();
  }

  /**
   *
   */
  fetchBaronies() {
    console.log('Fetching baronies with filters:', this.baronyFilters);
    this.territoryService.getBaronies(this.baronyFilters).subscribe(baronies => {
      this.baronies$.next(baronies);
    });
  }

  /**
   *
   * @param id
   */
  navigateToBarony(id: string): void {
    this.navigationService.navigateTo(`app/territories/barony/${id}`);
  }
}
