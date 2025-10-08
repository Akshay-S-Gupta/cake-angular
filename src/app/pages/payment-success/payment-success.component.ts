import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payment-success.component.html'
})
export class PaymentSuccessComponent {
  constructor(private router: Router, private cartService: CartService) {
    // Clear cart after successful payment
    this.cartService.clear();
  }

  continueShopping() {
    this.router.navigate(['/shop']);
  }
}


