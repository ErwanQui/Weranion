import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  /**
   *
   * @param router
   */
  constructor(
    private router: Router
  ) {}

  /**
   *
   * @param path
   */
  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}