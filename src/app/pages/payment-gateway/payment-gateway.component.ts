import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-gateway',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payment-gateway.component.html'
})
export class PaymentGatewayComponent {
  constructor(private router: Router) {}

  processPayment() {
    // Simulate payment processing
    setTimeout(() => {
      this.router.navigate(['/payment-success']);
    }, 2000);
  }
}


