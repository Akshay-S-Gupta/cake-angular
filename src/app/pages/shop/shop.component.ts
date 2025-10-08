import { Component, OnInit } from '@angular/core';
import { DatabaseService, Product, Category } from '../../services/database.service';
import { CartService } from '../../services/cart.service';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, RouterLink, FormsModule],
  templateUrl: './shop.component.html'
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  selectedCategory: string = 'All';
  sortBy: string = 'default';

  constructor(
    private databaseService: DatabaseService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Load products
    this.databaseService.getProducts().subscribe(products => {
      this.products = products;
    });

    // Load categories
    this.databaseService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'All') return this.products;
    return this.products.filter(product => product.category === this.selectedCategory);
  }

  get sortedProducts(): Product[] {
    let sorted = [...this.filteredProducts];
    switch (this.sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price); break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price); break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return sorted;
  }

  setSelectedCategory(category: string) { 
    this.selectedCategory = category; 
  }

  onSortChange(_: any) { /* UI only: method stub for select dropdown */ }

  addToCart(product: Product) {
    this.cartService.add({ 
      id: product.id, 
      name: product.name, 
      price: product.price, 
      qty: 1, 
      image: product.mainImage 
    });
  }

  isInCart(productId: number): boolean {
    return !!this.cartService.list().find(item => item.id === productId);
  }

  floor(num: number): number { 
    return Math.floor(num); 
  }
}
