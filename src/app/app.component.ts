import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CartlistComponent } from './cartlist/cartlist.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, CartlistComponent, WishlistComponent, RouterOutlet]
})
export class AppComponent {

}
