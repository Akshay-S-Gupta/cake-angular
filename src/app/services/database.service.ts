import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

export interface Product { id: number; name: string; price: number; image: string; }

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  constructor(private http: HttpService) {}
  getProducts(): Observable<Product[]> { return this.http.get<Product[]>('/products'); }
  getProduct(id: number): Observable<Product> { return this.http.get<Product>(`/products/${id}`); }
}


