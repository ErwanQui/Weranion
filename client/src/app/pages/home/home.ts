import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomePage {

  /**
   *
   * @param navigationService
   */
  constructor(
    private navigationService: NavigationService
  ) {}

  /**
   *
   * @param path
   */
  navigate(path) {
    this.navigationService.navigateTo(path);
  }
}
