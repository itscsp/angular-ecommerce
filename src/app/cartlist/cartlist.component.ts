import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CartService } from '../shared/services/cart.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-cartlist',
  imports: [NgClass, NgIf],
  templateUrl: './cartlist.component.html',
  styleUrl: './cartlist.component.css'
})
export class CartlistComponent  {
  constructor(private cartService: CartService) {}

  toggleSidebar() {
    this.cartService.toggleSidebar('cart');
  }

  get isOpen() {
    return this.cartService.sidebarState('cart');
  }

}
