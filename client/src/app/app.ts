import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  /**
   *
   * @param httpService
   */
  constructor(private httpService: HttpService) {}

  /**
   *
   */
  ngOnInit() {
    const currentToken = localStorage.getItem('token');
    if (currentToken) {
      console.log('u');
      this.httpService.updateToken(currentToken);
    }
  }
}
