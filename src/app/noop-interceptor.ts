import { Injectable } from '@angular/core'
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http'

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
    intercept(req, next: HttpHandler) {
        req['body'] = {aaa: 'saasefa'};
        console.log('设置头', req);
        return next.handle(req);
    }
}
