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

  addToCart(id: any) {
    const existingItem = this.cart.find((item) => item.itemId === id);
    if (existingItem) {
      existingItem.count += 1;
    } else {
      this.cart.push({ itemId: id, count: 1 });
    }
    this.updateCartCount();
  }

  removeFromCart(id: any) {
    const index = this.cart.findIndex((item) => item.itemId === id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.updateCartCount();
    }
  }

  private updateCartCount() {
    const totalCount = this.cart.reduce((acc, item) => acc + item.count, 0);
    this.cartCountSubject.next(totalCount);
  }

  getCart(): CartItem[] {
    return this.cart;
  }

  getTotalCount(): number {
    return this.cart.reduce((acc, item) => acc + item.count, 0);
  }
}
