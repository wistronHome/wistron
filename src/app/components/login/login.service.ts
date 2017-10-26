import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

    constructor(
        private $http: HttpClient
    ) { }

    /**
     * 用户登录
     * @param {string} username
     * @param {string} password
     */
    public login(userCode: string, password: string, callback) {
        let body = { userCode, password };
        console.log(body);
        this.$http.post(`/itm/login`, body).subscribe(result => {
            console.log(result);
            callback(result);
        });
    }
}
