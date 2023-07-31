import { Component,OnInit } from '@angular/core';
import { BookApiService } from 'src/app/service/apiService/book-api.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  constructor(private service: BookApiService) { }
  bannerResult: any = []
  ngOnInit() {
    this.bannerData()
  }
  bannerData(){
    this.service.newBookRelease().subscribe((result)=>{
      this.bannerResult = result.books
      console.log(this.bannerResult,'-----------banner')
    })
  }

}
