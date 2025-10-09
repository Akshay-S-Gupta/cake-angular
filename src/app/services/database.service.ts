import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';

export interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number | null;
  rating: number;
  stock: number;
  category: string;
  description: string;
  images: string[];
  mainImage: string;
  additionalInfo: string;
  shippingInfo: string;
  reviews: Review[];
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
}

export interface Category {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  private productsSubject = new BehaviorSubject<Product[]>([]);
  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  private teamMembersSubject = new BehaviorSubject<TeamMember[]>([]);

  constructor(private http: HttpService) {
    this.loadData();
  }

  private loadData(): void {
    // Load products
    this.http.get<Product[]>('/products').subscribe({
      next: (products) => {
        // Normalize incoming product data (IDs from db.json may be strings)
        const normalized = products.map(p => ({
          ...p,
          id: Number((p as any).id)
        } as Product));
        console.log('Products loaded:', normalized);
        this.productsSubject.next(normalized);
      },
      error: (error) => {
        console.error('Error loading products:', error);
        // Initialize with empty array if server is not available
        this.productsSubject.next([]);
      }
    });

    // Load categories
    this.http.get<Category[]>('/categories').subscribe({
      next: (categories) => {
        // Normalize category IDs too (db.json might store them as strings)
        const normalizedCats = categories.map(c => ({ ...c, id: Number((c as any).id) } as Category));
        console.log('Categories loaded:', normalizedCats);
        this.categoriesSubject.next(normalizedCats);
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        // Initialize with default categories if server is not available
        this.categoriesSubject.next([
          { id: 1, name: 'All' },
          { id: 2, name: 'Cakes' },
          { id: 3, name: 'Pastries' },
          { id: 4, name: 'Donuts' },
          { id: 5, name: 'Pies' },
          { id: 6, name: 'Desserts' }
        ]);
      }
    });

    // Load team members
    this.http.get<TeamMember[]>('/teamMembers').subscribe({
      next: (teamMembers) => {
        console.log('Team members loaded:', teamMembers);
        this.teamMembersSubject.next(teamMembers);
      },
      error: (error) => {
        console.error('Error loading team members:', error);
        // Initialize with empty array if server is not available
        this.teamMembersSubject.next([]);
      }
    });
  }

  // PRODUCTS - Observable methods
  getProducts(): Observable<Product[]> { 
    return this.productsSubject.asObservable(); 
  }
  
  getProduct(id: number): Observable<Product | undefined> { 
    return new Observable(observer => {
      this.productsSubject.subscribe(products => {
        const product = products.find(p => p.id === id);
        observer.next(product);
      });
    });
  }

  // PRODUCTS - Synchronous methods for components
  getProductsSync(): Product[] {
    return this.productsSubject.value;
  }

  getProductSync(id: number): Product | undefined {
    return this.productsSubject.value.find(p => p.id === id);
  }

  // CATEGORIES
  getCategories(): Observable<Category[]> { 
    return this.categoriesSubject.asObservable(); 
  }

  getCategoriesSync(): Category[] {
    return this.categoriesSubject.value;
  }

  // TEAM MEMBERS
  getTeamMembers(): Observable<TeamMember[]> { 
    return this.teamMembersSubject.asObservable(); 
  }

  getTeamMembersSync(): TeamMember[] {
    return this.teamMembersSubject.value;
  }
}
