import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BaroniesComponent } from './baronies/baronies';
import { CityComponent } from './city/city';
import { DuchiesComponent } from './duchies/duchies';

@Component({
  selector: 'app-territory',
  imports: [MatTabsModule, CityComponent, DuchiesComponent, BaroniesComponent],
  templateUrl: './territory.html',
  styleUrl: './territory.css',
})
export class TerritoryPage {}
