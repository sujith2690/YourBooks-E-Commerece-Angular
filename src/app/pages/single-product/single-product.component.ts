import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookApiService } from 'src/app/service/apiService/book-api.service';
import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/service/cartService/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  constructor(private routes: ActivatedRoute,
    private service: BookApiService,
    private cartService: CartService,
    private toastr: ToastrService) { }
  cartContent: any = []
  cartIcon = faShoppingCart;
  star = faStar;
  stars = faStar;
  bookDetails: any
  ngOnInit() {
    let getParamId = this.routes.snapshot.paramMap.get('id')
    console.log(getParamId, '--------getParamId')
    this.singleBookData(getParamId)
  }
  singleBookData(id: any) {
    this.service.singleBookDetails(id).subscribe((result) => {
      this.bookDetails = result
      console.log(this.bookDetails)
    })
  }
  getStarRatingArray(rating: number): number[] {
    return Array.from({ length: rating }, (_, index) => index);
  }
  addCart(id: any) {
    console.log(id, '---singleeee--id');
    this.cartService.addToCart(id);
    this.toastr.success("Item Add to Cart")
  }
  removeDoller(item: any): number {
    const priceWithoutDollarSign = parseFloat(item.price.replace('$', ''));
    return priceWithoutDollarSign 
  }
}
