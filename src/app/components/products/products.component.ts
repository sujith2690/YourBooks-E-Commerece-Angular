import { Component, OnInit } from '@angular/core';
import { BookApiService } from 'src/app/service/apiService/book-api.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/service/cartService/cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private service: BookApiService,private cartService: CartService) { }


  booksDetails: any = [];

  cartIcon = faShoppingCart;

  ngOnInit() {
    this.bannerData();
  }

  bannerData() {
    this.service.newBookRelease().subscribe((result) => {
      this.booksDetails = result.books;
      console.log(this.booksDetails, '-----------banner');
    });
  }


  addCart(id: any) {
    console.log(id, '-----id');
    this.cartService.addToCart(id);
    
  }
}
