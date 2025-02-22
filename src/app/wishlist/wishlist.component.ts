import { Component, computed, effect } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { product } from '../shared/services/products/product.model';

@Component({
  selector: 'app-wishlist',
  standalone: true, 
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  constructor(private cartService: CartService) {
  }

  get isWishOpen() {
    return this.cartService.sidebarState('wish');
  } 
  
  // Changed from cartData to wishData
  wishItems = computed(() => this.cartService.wishData())
  
  toggleWishSidebar() {
    this.cartService.toggleSidebar('wish');
    console.log(this.wishItems())
  }

  // Add method to remove from wishlist
  removeFromWish(id: number) {
    // You'll need to add this method to your CartService
    this.cartService.removeFromWish(id);
  }
}