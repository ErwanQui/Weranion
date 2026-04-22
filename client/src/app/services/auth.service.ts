import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   *
   * @param httpService
   */
  constructor(
        private httpService: HttpService
  ) {
  }

  /**
   *
   * @param username
   * @param password
   */
  login(username: string, password: string) {
    this.httpService.create('login/connect', 
      { username, password }
    ).subscribe((token: any) => {
      localStorage.setItem('token', token.token);
      this.httpService.updateToken(token.token);
    });
  }
}