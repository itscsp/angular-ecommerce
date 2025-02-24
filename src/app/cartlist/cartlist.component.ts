


import { Component, computed, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CartService } from '../shared/services/cart.service';
import { CommonModule, NgClass, NgFor, NgIf } from '@angular/common';
import { cartProduct } from '../shared/services/products/product.model';
import { RouterLink } from '@angular/router';
import { CartitemComponent } from '../components/cartitem/cartitem.component';


@Component({
  selector: 'app-cartlist',
  standalone: true,
  imports: [CommonModule, CartitemComponent, RouterLink],
  templateUrl: './cartlist.component.html',
  styleUrl: './cartlist.component.css'
})
export class CartlistComponent  {
  
  constructor(private cartService: CartService) {}

  get isOpen() {
    return this.cartService.sidebarState('cart');
  }

  cartItems = computed(() => this.cartService.cartData());

  totalItems = computed(() => {
    return this.cartItems().reduce((total, item) => total + item.quantity, 0);
  });

  totalAmount = computed(() => {
    return this.cartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  });

  closeCart() {
    this.cartService.toggleSidebar('cart');
  }



  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  removeAllItem(){
    this.cartItems().map((item) => {
      return this.removeItem(item.id)
    })
  }

  updateQuantity(item: cartProduct, change: number) {
    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      this.removeItem(item.id);
    }
  }

 


}
