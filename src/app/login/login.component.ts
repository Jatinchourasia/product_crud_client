import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private UserService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['admin@gmail.com', [Validators.required]],
      password: ['admin@gmail.com', [Validators.required]],
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.UserService.login(this.loginForm.value).subscribe(
        (response: any) => {
          this.isSubmitting = false;
          if (response?.user?.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000,
          });
          this.loginForm.reset();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('Invalid form');
    }
  }
}
