import { Component, signal } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inventory',
  imports: [],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory {
  
  protected readonly title = signal('client');
  i = ''

  constructor(
    private httpService: HttpService
  ) {}

  input() {
    this.i += 'a'
    this.httpService.get('food').subscribe((a) => console.log(1, a))
  }

  login(username: string, password: string): any {
    this.httpService.create(`login/connect`, 
      { username, password }
    ).subscribe((token: any) => {
      localStorage.setItem('token', token.token);
      this.httpService.updateToken(token.token)
    });
  }

  firstname: any;
  lastname: any;
  mj: any;
  year:  any;
  month: any;
  currentCrown: any


}
