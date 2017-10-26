import { Injectable } from '@angular/core'
import { HttpEvent, HttpHeaders , HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let Authorization = sessionStorage.getItem('Authorization');
        let authReq = null;
        if (Authorization) {
            authReq = req.clone({setHeaders: {'Authorization': Authorization}});
        }
        console.log(req);
        return next.handle(authReq || req);
    }
}
