import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RatingComponent } from '../components/rating/rating.component';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../shared/services/products/products.service';
import { product } from '../shared/services/products/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-product-details',
  imports: [RatingComponent, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
  standalone: true
})
export class ProductDetailsComponent implements OnInit {
  product = signal<any>(undefined);
  isFetching = signal<boolean>(false);
  error = signal<string | null>(null);
  
  private destroyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);

  constructor(private productService: ProductsService, private cartServices: CartService) {}

  ngOnInit() {
    this.loadProduct();
  }

  private loadProduct() {
    this.isFetching.set(true);
    this.error.set(null);

    const subscription = this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (!id) {
        this.error.set('Product ID not found');
        this.isFetching.set(false);
        return;
      }

      this.productService.loadSingleProduct(Number(id)).subscribe({
        next: (product) => {
          this.product.set(product);
          console.log("Product loaded from API");
        },
        error: (error) => {
          console.error("Error while loading single product", error);
          this.error.set('Failed to load product');
          this.product.set(undefined);
        },
        complete: () => {
          console.log('Product loading completed', this.product()?.title);
          this.isFetching.set(false);
        }
      });
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  addToCartHandler() {
    this.cartServices.addToCart(this.product());
  }
 // Add wishlist handler
 addToWishHandler(action: 'ADD' | 'REMOVE') {

  if (!this.product()) return;

  if (action === 'ADD') {
    this.cartServices.addToWish(this.product()!);
  } else {
    this.cartServices.removeFromWish(this.product()!.id);
  }
}

  isInWishlist = computed(() => {
      return this.cartServices.wishData().some(
      item => item.id === this.product().id
    );
  })
}