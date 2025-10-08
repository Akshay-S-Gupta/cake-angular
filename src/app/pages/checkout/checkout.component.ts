import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
  formData = {
    firstName: '',
    lastName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    state: 'Karnataka',
    zipCode: '',
    phone: '',
    orderNotes: '',
    paymentMethod: 'paypal'
  };

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

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

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const name = target.name;
    const value = target.value;
    
    this.formData = {
      ...this.formData,
      [name]: value
    };
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    
    if (this.isCartEmpty) {
      return;
    }

    // Process order and redirect to payment gateway
    this.router.navigate(['/payment-gateway']);
  }
}


