import { Component, computed, input, OnInit, signal } from '@angular/core';
import { product } from '../shared/services/products/product.model';
import { RouterLink } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '../components/rating/rating.component';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-product',
  imports: [RouterLink, CommonModule, RatingComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent  {
 
  product = input.required<product>();
  constructor(private cartServices: CartService) {}

  isInWishlist = computed(() => {
      return this.cartServices.wishData().some(
      item => item.id === this.product().id
    );
  })


  addToWishHandler() {
    if (this.isInWishlist()) {
      // If already in wishlist, remove it
      this.cartServices.removeFromWish(this.product().id);
    } else {
      // If not in wishlist, add it
      this.cartServices.addToWish(this.product());
    }
  }

  addToCartHandler() {
    this.cartServices.addToCart(this.product());
  }

  removeFromCart() {
    this.cartServices.removeFromCart(this.product().id);
  }
}