import { Injectable, signal } from '@angular/core';
import { cartProduct, product } from './products/product.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private isCartSiderBarOpen = signal<boolean>(false); // Cart Sidebar
  private isWishSiderBarOpen = signal<boolean>(false); // Wish Sidebar
  private cart = signal<cartProduct[]>([])
  private wish = signal<product[]>([])


  addToCart(data:product) {
    console.log("Cart Data:",data)

    const newItem = {...data, quantity: 1}
    const isCartItem = this.cart().find((item) => {
      return item.id === newItem.id
    })

    if(!isCartItem){
        const updatedCart = [...this.cart(), newItem]
        this.cart.set(updatedCart);
    } else {
      const updatedCart = this.cart().map((item) => {
        if(item.id === isCartItem.id){
          return {...item, quantity: isCartItem.quantity + 1}
        } else {
          return item;
        }
      })

      this.cart.set(updatedCart);
    }
    console.log(this.cart())
  }

  removeFromCart(id:number) {

    const isCartItem = this.cart().find((item) => {
      return item.id === id
    })

    if(isCartItem){
       const updatedCart = this.cart().filter(item => {
         return item.id !== id
      })

      this.cart.set(updatedCart)
    }
  }

  updateCart(id: number, type: 'INC' | 'DECS') {
   
    this.cart.update(items => 
      items.map(item => 
        item.id === id 
          ? { 
              ...item, 
              quantity: item.quantity + (type === 'INC' ? 1 : -1)
            }
          : item
      )
    )
  }

  addToWish(data:product) {
    console.log("Cart Data:",data)

    const newItem = {...data, isWish: true}
    const isCartItem = this.wish().find((item) => {
      return item.id === newItem.id
    })

    if(!isCartItem){
        const updatedCart = [...this.wish(), newItem]
        this.wish.set(updatedCart);
    } else {
      const updatedCart = this.wish().map((item) => {
        if(item.id === isCartItem.id){
          return {...item}
        } else {
          return item;
        }
      })

      this.wish.set(updatedCart);
    }
    console.log(this.wish())
  }



  // Add this method to your CartService class
  removeFromWish(id: number) {
    const isWishItem = this.wish().find((item) => {
      return item.id === id
    })

    if(isWishItem){
      const updatedWish = this.wish().filter(item => {
        return item.id !== id
      })

      this.wish.set(updatedWish)
    }
  }

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

  cartData() {
    return this.cart()
  }

  wishData() {
    return this.wish()
  }

}

