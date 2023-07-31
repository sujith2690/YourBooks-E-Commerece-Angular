import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookApiService {

  constructor(private http: HttpClient) { }
  baseUrl = "https://api.itbook.store/1.0/"

  newBookRelease(): Observable<any> {
    return this.http.get(`${this.baseUrl}new`)
  }
  // Book Details
  singleBookDetails(bookId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/books/${bookId}`);
  }
}
