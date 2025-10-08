import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { NgIf } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  isSubmitting = false;

  constructor(private cartService: CartService, private router: Router, private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      streetAddress: ['', [Validators.required, Validators.minLength(5)]],
      apartment: [''],
      city: ['', [Validators.required, Validators.minLength(2)]],
      state: ['Karnataka', [Validators.required]],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{5,6}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      orderNotes: [''],
      paymentMethod: ['paypal', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Initialize form with any user data if available
    // For now, we'll use empty values
  }

  get items(): CartItem[] {
    return this.cartService.list();
  }

  get totalPrice(): number {
    return this.cartService.totalPrice();
  }

  get isCartEmpty(): boolean {
    return this.items.length === 0;
  }

  onSubmit(): void {
    if (this.checkoutForm.valid && !this.isCartEmpty) {
      this.isSubmitting = true;

      // Process order and redirect to payment gateway
      this.router.navigate(['/payment-gateway']);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.checkoutForm.controls).forEach((key) => {
      const control = this.checkoutForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const control = this.checkoutForm.get(fieldName);
    if (control?.errors && control.touched) {
      if (control.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (control.errors['minlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${
          control.errors['minlength'].requiredLength
        } characters long`;
      }
      if (control.errors['pattern']) {
        if (fieldName === 'zipCode') {
          return 'Please enter a valid zip code (5-6 digits)';
        }
        if (fieldName === 'phone') {
          return 'Please enter a valid 10-digit phone number';
        }
      }
    }
    return '';
  }
}
