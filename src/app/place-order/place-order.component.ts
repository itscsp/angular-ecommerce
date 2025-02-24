import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../shared/services/cart.service';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "../components/login/login.component";
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [RouterLink, CommonModule, LoginComponent],
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent {
  private userService = inject(UserService);
  private cartService = inject(CartService);
  
  loginFormVisible = signal<boolean>(false);
  cartItems = computed(() => this.cartService.cartData());
  isUserLoggedIn = computed(() => this.userService.isUserLogedIn());

  showLoginForm(): void {
    this.loginFormVisible.set(!this.loginFormVisible());
  }
}
