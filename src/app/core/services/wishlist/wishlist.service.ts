import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  token: any;

  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // إضافة PLATFORM_ID
  ) {
    // التحقق من أن الكود يعمل في المتصفح قبل الوصول إلى localStorage
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
    }
  }

  // إضافة منتج إلى قائمة الرغبات
  Addwishlist(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`, { "productId": id }, {
      headers: {
        token: this.token
      }
    });
  }

  // جلب قائمة الرغبات
  getwishlist(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`, {
      headers: {
        token: this.token
      }
    });
  }

  // حذف منتج من قائمة الرغبات
  deletwishlist(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`, {
      headers: {
        token: this.token
      }
    });
  }
}