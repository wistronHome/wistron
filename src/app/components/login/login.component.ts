import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MissionService } from '../../mission-store/mission.service'
import { NzMessageService } from 'ng-zorro-antd'
import { User, Utils } from '../../models'
import { LoginService } from './login.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [ LoginService, NzMessageService ]
})
export class LoginComponent implements OnInit {
    imageKey = Utils.getUUID();
    usercode: string = '';
    password: string = '';
    checkCode: string = '';
    image: string = `http://10.5.31.24:8080/itm/getImageCode/${ this.imageKey }?time=${ Utils.getUUID() }`;
    constructor(
        private $mission: MissionService,
        private $service: LoginService,
        private $router: Router,
        private $message: NzMessageService
    ) { }

    ngOnInit() {
    }

    /**
     * 切换验证码
     */
    public changeImageCode() {
        this.image = `http://10.5.31.24:8080/itm/getImageCode/${ this.imageKey }?time=${ Utils.getUUID() }`;
    }

    /**
     * 登录方法
     */
    login() {
        this.validate(this.usercode, this.password).then((result: ValidateResult) => {
            if (result.isOk) {
                this.$service.login(this.usercode, this.password, this.checkCode, this.imageKey, result => {
                    if (result.ok) {
                        this.$mission.commitLoginStatusChange(result['user']);
                        sessionStorage.setItem('__currentUser', JSON.stringify(result.user));
                        this.$router.navigate(['/asset']);
                    } else {
                        this.$message.error('用户名或者密码错误~')
                    }
                });
            } else {
                this.$message.error('请填写完整~')
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
