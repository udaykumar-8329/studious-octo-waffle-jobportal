import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*',
              'content-type': 'application/json', 'Authorization' : `Bearer ${token}` }  )
    if (!token) {
      return next.handle(req);
    }
    const newRequest = req.clone({
      headers: headers
    });

    return next.handle(newRequest);
  }

}
