import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { product } from './product.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private httpClient = inject(HttpClient);
  products = signal<product[]>([]);


  loadProduct() {
    return this.httpClient.get<product[]>('https://fakestoreapi.com/products') 
  }

  loadSingleProduct(id: number) {
    return this.httpClient.get<product>(`https://fakestoreapi.com/products/${id}`)
  }

  constructor() {}
}
