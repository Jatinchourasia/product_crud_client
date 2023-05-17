import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'product_crud_client';

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
  isAdmin(): boolean {
    return this.userService.isAdmin();
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
    this.snackBar.open('Logout successful!', 'Close', {
      duration: 3000,
    });
  }
}
