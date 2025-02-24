import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CartlistComponent } from './cartlist/cartlist.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CartService } from './shared/services/cart.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, CartlistComponent, WishlistComponent, RouterOutlet]
})
export class AppComponent implements OnInit{

  constructor (private cartService: CartService, private router: Router){}
  private destroyRef = inject(DestroyRef)
  get cartSidebarOpen() {
    return this.cartService.sidebarState('cart')
  }

  get wishSidebarOpen() {
    return this.cartService.sidebarState('wish')
  }

  ngOnInit(): void {
    const subscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(this.cartSidebarOpen){
          this.cartService.toggleSidebar('cart')
        }
        if(this.wishSidebarOpen){
          this.cartService.toggleSidebar('wish')
        }
      }
    })

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    })
  }


}
