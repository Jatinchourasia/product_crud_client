import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isSubmitting = false;
  constructor(
    private fb: FormBuilder,
    private UserService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  onSubmit(): void {
    if (this.signupForm.valid) {
      this.isSubmitting = true;
      this.UserService.signup(this.signupForm.value).subscribe(
        (response) => {
          // If signup is successful, you can navigate to the home page or login page
          this.isSubmitting = false;

          this.router.navigate(['/']);
          this.snackBar.open('Signup successful!', 'Close', {
            duration: 3000,
          });
          this.signupForm.reset();
        },
        (error) => {
          this.snackBar.open('Please fix the errors in the form.', 'Close', {
            duration: 3000,
          });
          this.isSubmitting = false;
        }
      );
    } else {
      console.log('Invalid form');
    }
  }
}
