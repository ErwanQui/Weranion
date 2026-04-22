import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username;
  password;

  /**
   *
   * @param authService
   */
  constructor(
    private authService: AuthService
  ) {}

  /**
   *
   */
  login() {
    console.log(this.username, this.password);
    this.authService.login(this.username, this.password);
  }
}
