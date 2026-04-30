import { Component, OnInit } from '@angular/core';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-city',
  imports: [],
  templateUrl: './city.html',
  styleUrl: './city.css',
})
export class CityPage implements OnInit {

  /**
   *
   * @param cityService
   */
  constructor(
    private cityService: CityService
  ) {}

  /**
   *
   */
  ngOnInit(): void {
    this.cityService.getCities().subscribe(cities => {
      console.log(cities);
    });
  }
}
