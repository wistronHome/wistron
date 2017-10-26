import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MissionService } from '../../mission-store/mission.service'
import { User } from '../../models'
import { LoginService } from './login.service'
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [ LoginService ]
})
export class LoginComponent implements OnInit {
    usercode: string = '';
    password: string = '';
    constructor(
        private $mission: MissionService,
        private $service: LoginService,
        private $router: Router
    ) { }

    ngOnInit() {

    }

    /**
     * 登录方法
     */
    login() {
        this.validate(this.usercode, this.password).then((result: ValidateResult) => {
            if (result.isOk) {
                this.$service.login(this.usercode, this.password, result => {
                    this.$mission.commitLoginStatusChange(result['user']);
                    this.$router.navigate(['/asset'])
                });
            } else {
                console.log('failed');
            }
        });
    }

    /**
     * 验证用户名/密码/验证码
     * @param username
     * @param password
     * @returns {Promise<ValidateResult>}
     */
    private validate(username: string, password: string, yzm: string = ''): Promise<ValidateResult> {
        let result = new ValidateResult();
        if (username && password) {
            result.isOk = true;
        }
        return Promise.resolve(result);
    }
}

class ValidateResult {
    private _isOk: boolean;
    private _msg: string;

    constructor() {
        this.isOk = false;
    }

    set isOk(flag: boolean) {
        this._isOk = flag;
    }
    get isOk(): boolean {
        return this._isOk;
    }

    set msg(msg: string) {
        this._msg = msg;
    }
    get msg(): string {
        return this._msg;
    }
}
