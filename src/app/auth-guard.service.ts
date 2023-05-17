import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (!this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/login');
      return false;
    } else if (!this.userService.isAdmin()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
