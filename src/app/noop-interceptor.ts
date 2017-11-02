import { Injectable } from '@angular/core'
import { HttpEvent, HttpHeaders , HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let token = sessionStorage.getItem('authorization');
        let authReq = null;
        if (token) {
            authReq = req.clone({setHeaders: {Authorization: token}});
        }
        return next.handle(authReq || req);
    }
}
