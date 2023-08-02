import { Component, OnInit } from '@angular/core';
import { BookApiService } from 'src/app/service/apiService/book-api.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/service/cartService/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private service: BookApiService,private cartService: CartService,private toastr: ToastrService) { }


  booksDetails: any = [];

  cartIcon = faShoppingCart;

  ngOnInit() {
    this.bannerData();
  }

  bannerData() {
    this.service.newBookRelease().subscribe((result) => {
      this.booksDetails = result.books;
    });
  }


  addCart(id: any) {
    this.cartService.addToCart(id);
    this.toastr.success("Item Add to Cart")
  }
  removeDoller(item: any): number {
    const priceWithoutDollarSign = parseFloat(item.price.replace('$', ''));
    return priceWithoutDollarSign 
  }
}
