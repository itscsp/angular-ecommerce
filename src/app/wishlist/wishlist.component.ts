import { Component } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  imports: [CommonModule],
  templateUrl:'./wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
 constructor(private cartService: CartService) {}

  toggleWishSidebar() {
    this.cartService.toggleSidebar('wish');
  }

  get isWishOpen() {
    return this.cartService.sidebarState('wish');
  } 
}
