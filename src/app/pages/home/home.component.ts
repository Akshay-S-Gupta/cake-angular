import { Component, OnInit } from '@angular/core';
import { NgFor, NgClass, NgIf, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DatabaseService, Product } from '../../services/database.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgFor, NgClass, NgIf, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  images: string[] = [];
  banner = '';
  featuredProducts: Product[] = [];
  bannerImages: string[] = [];
  highlightImages: string[] = [];

  constructor(private imageService: ImageService, private databaseService: DatabaseService) {}

  ngOnInit(): void {
    // Load banner and highlight images
    this.bannerImages = this.imageService.getBannerImages();
    this.highlightImages = this.imageService.getHighlightImages();
    this.banner = this.imageService.getBannerImage();

    // Load featured products (first 5 products)
    this.databaseService.getProducts().subscribe((products) => {
      this.featuredProducts = products.slice(0, 4);
      // Use actual product images if available, otherwise fallback to cake images
      this.images = this.featuredProducts.map(
        (product, index) => product.mainImage || this.imageService.getProductImage(index + 1)
      );
    });
  }

  // Helper method for Math.floor
  floor(value: number): number {
    return Math.floor(value);
  }
}
