import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Result} from "../../models/result";

@Injectable()
export class LoginService {

    constructor(
        private $http: HttpClient
    ) { }

    /**
     * 用户代码
     * @param {string} userCode
     * @param {string} password
     * @param callback
     */
    public login(userCode: string, password: string, callback) {
        let body = { userCode, password };
        console.log(body);
        this.$http.post(`/itm/login`, body).subscribe((result: Result) => {
            if (result.code === 0) {
                let Authorization = result.data['Authorization'];
                sessionStorage.setItem('authorization', Authorization);
                callback(result.data);
            }
        });
    }
}
