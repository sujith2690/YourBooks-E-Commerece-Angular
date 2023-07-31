import { Component } from '@angular/core';
import { faBars, faHome, faBook, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/service/cartService/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private cartService: CartService) {}
  cartCount: number = 0;
  isMenuOpen = false;
  menuIcon = faBars;
  homeIcon = faHome;
  bookIcon = faBook;
  cartIcon = faShoppingCart;
  loginIcon = faUser;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  totalCart(){
    this.cartCount = this.cartService.getTotalCount();
  }
}
