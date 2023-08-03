
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cartService/cart.service';
import { faTrash,faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { BookApiService } from 'src/app/service/apiService/book-api.service';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

type CartItem = {
  itemId: string;
  count: number;
};

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  bookDetails: any[] = [];
  trash = faTrash;
  cartIcon = faShoppingCart;
  constructor(
    private cartService: CartService,
    private service: BookApiService,
    private toastr: ToastrService
  ) {
    // this.cart = this.cartService.getCart();
    this.loadCartDetails();
  }

  ngOnInit() { }

  loadFromLocalStorage() {
    const storedContent = localStorage.getItem('cartItems');
    if (storedContent) {
      this.cart = JSON.parse(storedContent);
    } else {
      this.cart = [];
    }
  }

  loadCartDetails() {

    this.loadFromLocalStorage()
    const itemIds = this.cart.map(item => item.itemId);
    const requests = itemIds.map(itemId => this.service.singleBookDetails(itemId));
    forkJoin(requests).subscribe(results => {
      this.bookDetails = results;
      this.updateBookDetailsCount();

    });
  }
  updateBookDetailsCount() {
    this.bookDetails.forEach((bookDetail, index) => {
      bookDetail.count = this.cart[index].count;
    });
  }

  increment(id: string) {
    this.cartService.addToCart(id);
    this.loadCartDetails();
    this.toastr.success("Quantity increased")
  }

  decrement(id: string) {
    this.cartService.decrementCart(id);
    this.loadCartDetails();
    this.toastr.warning("Quantity decreased")
  }
  remove(id: string) {
    const index = this.cart.findIndex((item) => item.itemId === id);
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.saveToLocalStorage();
      this.loadCartDetails();
      this.toastr.error("Item is Removed")
    }
  }
  saveToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cart));
  }
  calculateTotalPrice(item: any): number {
    const priceWithoutDollarSign = parseFloat(item.price.replace('$', ''));
    return priceWithoutDollarSign * item.count;
  }
  calculateSubtotal(): number {
    let subtotal = 0;
    this.bookDetails.forEach((bookDetail) => {
      // Calculate the total price for each book (price * count) and add it to the subtotal
      subtotal += this.calculateTotalPrice(bookDetail);
    });
    return subtotal;
  }
}

