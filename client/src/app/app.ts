import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
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
    console.log('app');
  }
}
