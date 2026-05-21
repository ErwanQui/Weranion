import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BehaviorSubject, Observable } from 'rxjs';
import { Barony, Duchy, DuchyFilters } from '../../../models/territory.models';
import { NavigationService } from '../../../services/navigation.service';
import { TerritoryService } from '../../../services/territory.service';

@Component({
  selector: 'app-duchy',
  imports: [MatFormFieldModule, MatInput, FormsModule, MatSelectModule, CommonModule, MatButtonModule],
  templateUrl: './duchies.html',
  styleUrl: './duchies.css',
})
export class DuchiesComponent {
  protected duchies$: BehaviorSubject<Duchy[]> = new BehaviorSubject<Duchy[]>([]);
  protected duchyFilters: DuchyFilters = {};

  protected baronies$!: Observable<Barony[]>;
    
  /**
   *
   * @param territoryService Handle territories actions
   * @param navigationService Handle the navigation
   */
  constructor(
        private territoryService: TerritoryService,
        private navigationService: NavigationService
  ) {
    this.baronies$ = this.territoryService.getBaroniesObservable();
    
    this.fetchDuchies();
  }
    
  /**
   *
   */
  fetchDuchies() {
    console.log('Fetching duchies with filters:', this.duchyFilters);
    this.territoryService.getDuchies(this.duchyFilters).subscribe(duchies => {
      this.duchies$.next(duchies);
    });
  }
    
  /**
   *
   * @param id
   */
  navigateToDuchy(id: string): void {
    this.navigationService.navigateTo(`app/territories/duchy/${id}`);
  }
}
