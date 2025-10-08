import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImageService {
  getBannerImage(): string { 
    return 'assets/Banner/banner5.png'; 
  }

  getHeroImage(): string { 
    return 'assets/Banner/banner4.jpg'; 
  }

  getProductImage(index: number): string { 
    const idx = ((index - 1) % 5) + 1; 
    return `assets/images/cake${idx}.jpg`; 
  }

  // Helper method to get full asset path
  getAssetPath(path: string): string {
    if (path.startsWith('/assets/')) {
      return path;
    }
    return `/assets/${path}`;
  }

  // Get banner images for carousel
  getBannerImages(): string[] {
    return [
      'assets/Banner/banner1.jpg',
      'assets/Banner/banner2.jpg',
      'assets/Banner/banner3.jpg',
      'assets/Banner/banner4.jpg',
      'assets/Banner/banner5.png',
      'assets/Banner/banner6.jpg'
    ];
  }

  // Get highlight images
  getHighlightImages(): string[] {
    return [
      'assets/highlight-1.jpg',
      'assets/highlight-2.jpg',
      'assets/highlight-3.jpg',
      'assets/highlight-4.jpg'
    ];
  }
}
