import { Component, computed } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';  // Import FontAwesomeModule
import { faCartShopping, faHeart as fillHeart } from '@fortawesome/free-solid-svg-icons';  // Solid icons
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';  // Regular icons
import { CartService } from '../shared/services/cart.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink, CommonModule],  // Import FontAwesomeModule for this component
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  // Corrected the typo to `styleUrls`
})
export class HeaderComponent {
  faCartShopping = faCartShopping;
  emptyHeart = emptyHeart;  // Regular (empty) heart icon
  fillHeart = fillHeart;  // Solid (filled) heart icon
  isHeartFilled = false

  constructor(private cartService: CartService){

  }

  cartLength =  computed(() => this.cartService.cartData().length)
  wishLength = computed(() => this.cartService.wishData().length)


  toggleSidebar(type: 'wish' | 'cart') {
    this.cartService.toggleSidebar(type)
  }

}
