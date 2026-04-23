import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { NavigationService } from '../services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {

  /**
   *
   * @param authService
   * @param navigationService
   */
  constructor(
    private authService: AuthService,
    private navigationService: NavigationService
  ) {}

  /**
   *
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
