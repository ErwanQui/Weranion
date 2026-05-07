import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginData } from '../models/utils.models';
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
  login(username: string, password: string): Observable<string> {
    return this.httpService.create<string, LoginData>('login/connect', 
      { username, password }
    ).pipe(tap(token => {
      window.localStorage.setItem('token', token);
      this.httpService.updateToken(token);
    }));
  }

  /**
   *
   */
  verifyAccess() {
    return this.httpService.get<string, never>('login/verify', undefined, true);
  }
}