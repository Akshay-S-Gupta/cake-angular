import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [FormsModule, NgClass, NgIf],
  template: `
    <section class="newsletter-section">
      <div class="container">
        <div class="newsletter-content text-center">
          <h2 class="newsletter-title">Join Our Newsletter</h2>
          <p class="newsletter-subtitle">Sign Up for our newsletter and never miss any offers</p>
          <form class="newsletter-form" (submit)="onSubmit($event)">
            <input type="email" class="form-control newsletter-input" placeholder="Your Email Address" [(ngModel)]="email" name="email" required [disabled]="isSubmitting" />
            <button type="submit" class="btn newsletter-btn" [disabled]="isSubmitting">{{ isSubmitting ? 'SIGNING UP...' : 'SIGN UP' }}</button>
          </form>
          <div class="mt-3" [ngClass]="{ 'text-success': success, 'text-danger': !success }" *ngIf="message">{{message}}</div>
        </div>
      </div>
    </section>
  `
})
export class NewsletterComponent {
  email = '';
  isSubmitting = false;
  message = '';
  success = false;

  onSubmit(e: Event) {
    e.preventDefault();
    if (!this.email.trim()) { this.message = 'Please enter your email address'; this.success = false; return; }
    this.isSubmitting = true; this.message = '';
    setTimeout(() => { this.success = true; this.message = 'Thank you for subscribing to our newsletter!'; this.email=''; this.isSubmitting = false; }, 600);
  }
}


