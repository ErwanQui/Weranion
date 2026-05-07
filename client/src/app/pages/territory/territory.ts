import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { BaronyComponent } from './barony/barony';
import { CityComponent } from './city/city';
import { DuchyComponent } from './duchy/duchy';

@Component({
  selector: 'app-territory',
  imports: [MatTabsModule, CityComponent, DuchyComponent, BaronyComponent],
  templateUrl: './territory.html',
  styleUrl: './territory.css',
})
export class TerritoryPage {}
