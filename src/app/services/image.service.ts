import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImageService {
  getBannerImage(): string { 
    return 'assets/Banner/banner5.jpg'; 
  }

  getHeroImage(): string { 
    return 'assets/Banner/banner4.jpg'; 
  }

  getProductImage(index: number): string { 
    const idx = ((index - 1) % 5) + 1; 
    return `assets/images/cake${idx}.jpg`; 
  }
}
