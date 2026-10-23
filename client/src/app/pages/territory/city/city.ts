import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { Barony, City, CityFilters, Duchy } from '../../../models/territory.models';
import { TerritoryService } from '../../../services/territory.service';

@Component({
  selector: 'app-city',
  imports: [MatFormFieldModule, MatInput, FormsModule, MatSelectModule, CommonModule],
  templateUrl: './city.html',
  styleUrl: './city.css',
})
export class CityComponent implements OnInit {

  protected cityFilters: CityFilters = {};
  protected duchies$!: Observable<Duchy[]>;
  protected baronies$!: Observable<Barony[]>;

  protected cities: City[] = [];

  /**
   *
   * @param territoryService Handle territories actions
   */
  constructor(
    private territoryService: TerritoryService
  ) {}

  /**
   *
   */
  ngOnInit(): void {
    this.duchies$ = this.territoryService.getDuchiesObservable();
    this.baronies$ = this.territoryService.getBaroniesObservable();

    this.fetchCities();
  }

  /**
   *
   */
  fetchCities() {
    this.territoryService.getCities(this.cityFilters).subscribe(cities => {
      this.cities = cities;
    });
  }
}
