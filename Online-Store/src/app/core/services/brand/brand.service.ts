import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  token: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private httpClient: HttpClient
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token'); // جلب الـ token من localStorage
    }
  }

  getAllbrands(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands`,{
      headers:{
        token:this.token
      }
    });
  }

  getspecificbrands(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands/${id}`, {
      headers:{
        token:this.token
      }
    });
  }
}