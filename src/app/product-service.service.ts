import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './interfaces/product.js';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://bronze-lovebird-gear.cyclic.app/api';
  constructor(private http: HttpClient) {}
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProduct(id: string): Observable<Product> {
    const url = `${this.apiUrl}/product/${id}`;
    return this.http.get<Product>(url);
  }

  createProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/product/add`, formData);
  }

  updateProduct(id: string, formData: FormData): Observable<Product> {
    const url = `${this.apiUrl}/product/${id}`;
    return this.http.put<Product>(url, formData);
  }

  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl}/product/${id}`;
    return this.http.delete<void>(url);
  }
}
