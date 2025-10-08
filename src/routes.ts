import { Routes } from '@angular/router';
import { HomeComponent } from './app/pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'shop',
    loadComponent: () => import('./app/pages/shop/shop.component').then(m => m.ShopComponent)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./app/pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./app/pages/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./app/pages/checkout/checkout.component').then(m => m.CheckoutComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./app/pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'team',
    loadComponent: () => import('./app/pages/team/team.component').then(m => m.TeamComponent)
  },
  {
    path: 'signin',
    loadComponent: () => import('./app/pages/sign-in/sign-in.component').then(m => m.SignInComponent)
  },
  {
    path: 'signup',
    loadComponent: () => import('./app/pages/sign-up/sign-up.component').then(m => m.SignUpComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./app/pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'payment',
    loadComponent: () => import('./app/pages/payment-gateway/payment-gateway.component').then(m => m.PaymentGatewayComponent)
  },
  {
    path: 'payment-success',
    loadComponent: () => import('./app/pages/payment-success/payment-success.component').then(m => m.PaymentSuccessComponent)
  }
];


