import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  /** Constructor of Navbar
   *
   * @param navigationService Handle the navigation
   */
  constructor(
    private navigationService: NavigationService
  ) {}

  /** Navigate to a specified page
   *
   * @param path The path to navigate to
   */
  navigateTo(path: string): void {
    this.navigationService.navigateTo(path);
  }
}
