import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {

  /** Constructor of LoginGuard
   *
   * @param authService Handle the authentication
   * @param navigationService Handle the navigation
   */
  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) {}

  /** Check whether the user is authenticated and can access the app
   *
   * @returns An Observable that emits true if the user is authenticated, false otherwise. If the user is not authenticated, it also navigates to the login page.
   */
  canActivateChild(): Observable<boolean> {
    return this.authService.verifyAccess().pipe(
      take(1),
      map(() => true),
      catchError(() => {
        this.navigationService.navigateTo('login');
        return of(false);
      }));
  }
}
