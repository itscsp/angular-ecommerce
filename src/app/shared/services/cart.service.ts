import { Injectable, signal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private isCartSiderBarOpen = signal<boolean>(false);
  private isWishSiderBarOpen = signal<boolean>(false);


  toggleSidebar(type: 'wish' | 'cart') {

    if(type === 'cart'){
      this.isCartSiderBarOpen.update(state => !state)
    } else{
      this.isWishSiderBarOpen.update(state => !state)
    }
    

  }

  sidebarState(type: 'wish' | 'cart'){

    if(type === 'cart'){
      return this.isCartSiderBarOpen()
    } else {
      return this.isWishSiderBarOpen()
    }
  }

}

