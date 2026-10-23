import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  /** The path history */
  private pathHistory!: string[];

  private previousCurrentPath!: string;

  /**
   *
   * @param router
   */
  constructor(
    private router: Router
  ) {
    this.pathHistory = [];
  }

  /**
   *
   * @param path
   * @param addToHistory
   */
  navigateTo(path: string, addToHistory: boolean = true): void {
    if (addToHistory && this.previousCurrentPath) {
      this.pathHistory.push(this.previousCurrentPath);
    }
    this.previousCurrentPath = path;
    this.router.navigate([path]);
  }

  /** Navigate to the previous page */
  return(): void {
    if (this.hasHistory()) {
      const lastPath = this.pathHistory.pop() as string;
      this.navigateTo(lastPath, false);
    }
  }

  /** Check whether the navigation has history
   *
   * @returns Whether the navigation has history
   */
  hasHistory(): boolean {
    return this.pathHistory.length > 0;
  }
}