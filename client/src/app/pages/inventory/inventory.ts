import { Component, signal } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-inventory',
  imports: [],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory {
  
  protected readonly title = signal('client');
  i = '';

  /**
   *
   * @param httpService
   */
  constructor(
    private httpService: HttpService
  ) {}

  /**
   *
   */
  input() {
    this.i += 'a';
    this.httpService.get('food').subscribe((a) => console.log(1, a));
  }

  firstname: any;
  lastname: any;
  mj: any;
  year:  any;
  month: any;
  currentCrown: any;


}
