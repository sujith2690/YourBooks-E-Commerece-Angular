import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

type CartItem = {
  itemId: string;
  count: number;
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[] = [];
  private cartCountSubject = new Subject<number>();
  cartCount$ = this.cartCountSubject.asObservable();

  addToCart(id: string) {
    const existingItem = this.cart.find((item) => item.itemId === id);
    if (existingItem) {
      existingItem.count += 1;
      console.log(existingItem.count,'--------count')
    } else {
      this.cart.push({ itemId: id, count: 1 });
    }
    this.saveToLocalStorage();
    this.loadFromLocalStorage();
    this.updateCartCount();
  }
  decrementCart(id: string){
    const existingItem = this.cart.find((item) => item.itemId === id);
    if (existingItem &&  existingItem.count > 1 ) {
      existingItem.count -= 1;
      console.log(existingItem.count,'--------count')
    } 
    this.saveToLocalStorage();
    this.updateCartCount();
    this.loadFromLocalStorage();
  }

  removeFromCart(id: string) {
    const index = this.cart.findIndex((item) => item.itemId === id);
    console.log(index,'---here')
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.saveToLocalStorage();
      this.updateCartCount();
    }
  }
  getCart(): CartItem[] {
    console.log(this.cart,'-------load local')
    this.loadFromLocalStorage();
    return this.cart;
  }
  getTotalCount(): number {
    this.loadFromLocalStorage();
    return this.cart.reduce((acc, item) => acc + item.count, 0);
  }

  private updateCartCount() {
    const totalCount = this.cart.reduce((acc, item) => acc + item.count, 0);
    console.log(totalCount,'----...6')
    this.cartCountSubject.next(totalCount);
  }

  private loadFromLocalStorage() {
    const storedContent = localStorage.getItem('cartItems');
    if (storedContent) {
      this.cart = JSON.parse(storedContent);
    } else {
      this.cart = [];
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cart));
  }
}
