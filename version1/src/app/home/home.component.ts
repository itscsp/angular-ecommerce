import { Component, DestroyRef, OnInit, computed, effect, inject, signal } from '@angular/core';
import { product } from '../shared/services/products/product.model';
import { ProductsService } from '../shared/services/products/products.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Fixed property name
  imports: [NgFor, NgIf, ProductComponent]
})
export class HomeComponent implements OnInit {
  products = computed(() => this.productServices.products());
  isFetching = signal<boolean>(false)
  private destroyRef = inject(DestroyRef);

  constructor(private productServices: ProductsService) {}

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.productServices.loadProduct().subscribe({
      next: (products) => {
        this.productServices.products.set(products)
        console.log('Products loaded successfully');
      },
      error: (error) => {
        console.log('Error loading products:', error)
      },
      complete: () => {
        console.log('Products loading completed');
        this.isFetching.set(false);
      }
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

  }
}
