import { Injectable } from '@angular/core';

export interface CartItem { id: number; name: string; price: number; qty: number; image: string; }

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: CartItem[] = [];
  add(item: CartItem) {
    const existing = this.items.find(i => i.id === item.id);
    if (existing) existing.qty += item.qty; else this.items.push({ ...item });
  }
  remove(id: number) { this.items = this.items.filter(i => i.id !== id); }
  clear() { this.items = []; }
  list(): CartItem[] { return this.items; }
  totalItems(): number { return this.items.reduce((sum, i) => sum + i.qty, 0); }
  totalPrice(): number { return this.items.reduce((sum, i) => sum + i.price * i.qty, 0); }
}


