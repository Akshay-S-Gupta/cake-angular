import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  id = 1;
  imgSrc = '';
  constructor(route: ActivatedRoute){
    this.id = Number(route.snapshot.paramMap.get('id') || '1');
    const idx = ((this.id - 1) % 5) + 1;
    this.imgSrc = `assets/images/cake${idx}.jpg`;
  }
}


