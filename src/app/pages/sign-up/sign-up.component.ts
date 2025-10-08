import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
  signUpForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private formService: FormService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      if (confirmPassword?.errors?.['passwordMismatch']) {
        delete confirmPassword.errors['passwordMismatch'];
        if (Object.keys(confirmPassword.errors).length === 0) {
          confirmPassword.setErrors(null);
        }
      }
    }
    return null;
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      this.successMessage = '';
      
      const { firstName, email, password } = this.signUpForm.value;
      
      this.userService.register({ firstName, email, password }).subscribe({
        next: (user) => {
          this.isLoading = false;
          this.successMessage = 'Account created successfully! Please sign in.';
          // Clear form
          this.signUpForm.reset();
          // Redirect to sign-in after a short delay
          setTimeout(() => {
            this.router.navigate(['/sign-in']);
          }, 2000);
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Registration failed. Email might already be in use.';
          console.error('Registration error:', error);
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.signUpForm.controls).forEach(key => {
      const control = this.signUpForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.signUpForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['minlength']) {
        if (fieldName === 'firstName') {
          return 'First name must be at least 2 characters long';
        }
        return 'Password must be at least 6 characters long';
      }
      if (control.errors['passwordMismatch']) {
        return 'Passwords do not match';
      }
    }
    return '';
  }
}


