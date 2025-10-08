import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DatabaseService, Product } from '../../services/database.service';
import { CartService } from '../../services/cart.service';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule, RouterModule],
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  quantity: number = 1;
  selectedImage: number = 0;
  activeTab: string = 'description';
  relatedProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute, 
    private databaseService: DatabaseService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    // Load the specific product
    this.databaseService.getProduct(id).subscribe(product => {
      this.product = product;
    });

    // Load all products to find related ones
    this.databaseService.getProducts().subscribe(products => {
      this.relatedProducts = products.filter(p => p.id !== id).slice(0, 4);
    });
  }

  getFloor(val: number): number {
    return Math.floor(val);
  }

  incrementQuantity() {
    if (this.product && this.quantity < this.product.stock) this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) this.quantity--;
  }

  validateQuantity() {
    if (!this.product) return;
    if (this.quantity < 1) this.quantity = 1;
    if (this.quantity > this.product.stock) this.quantity = this.product.stock;
  }

  handleAddToCart() {
    if (this.product) {
      this.cartService.add({
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        qty: this.quantity,
        image: this.product.mainImage
      });
      alert(`${this.quantity} ${this.product.name}(s) added to cart!`);
    }
  }

  setActiveTab(tabName: string) {
    this.activeTab = tabName;
  }

  selectImage(idx: number) {
    this.selectedImage = idx;
  }
}
