import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private isCartSiderBarOpen = signal<boolean>(false); // Cart Sidebar
  private isWishSiderBarOpen = signal<boolean>(false); // Wish Sidebar


  // Toggle Sidebar
  toggleSidebar(type: 'wish' | 'cart') {

    if(type === 'cart'){
      this.isCartSiderBarOpen.update(state => !state)
    } else{
      this.isWishSiderBarOpen.update(state => !state)
    }
    

  }

  // Publish sidebar state
  sidebarState(type: 'wish' | 'cart'){

    if(type === 'cart'){
      return this.isCartSiderBarOpen()
    } else {
      return this.isWishSiderBarOpen()
    }
  }

}

