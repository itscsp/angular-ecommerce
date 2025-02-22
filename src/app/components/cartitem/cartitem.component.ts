import { Component, input, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { cartProduct } from '../../shared/services/products/product.model';

@Component({
  selector: 'app-cartitem',
  imports: [RouterLink],
  templateUrl: './cartitem.component.html',
  styleUrl: './cartitem.component.css'
})
export class CartitemComponent {
  data = input<any>();

  constructor(private cartServices: CartService){}

  removeFromCart(id:number){
    this.cartServices.removeFromCart(id)
  }

  updateCart(id: number, type: 'INC' | 'DECS'){
    this.cartServices.updateCart(id, type);
  }
}
