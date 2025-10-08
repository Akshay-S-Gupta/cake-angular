import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NgFor],
  templateUrl: './shop.component.html'
})
export class ShopComponent {
  images = [
    'assets/images/cake1.jpg',
    'assets/images/cake2.jpg',
    'assets/images/cake3.jpg',
    'assets/images/cake4.jpg',
    'assets/images/cake5.jpg'
  ];
}


