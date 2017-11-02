import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router'
import { NzMessageService } from 'ng-zorro-antd';
import { MenuTopService } from './menu-top.service';
import { MissionService } from "../../mission-store/mission.service";
import { User, Utils } from "../../models";

@NgModule({
    imports:      [  ],
    declarations: [ MenuTopComponent ],
    bootstrap:    [ MenuTopComponent ]
})

@Component({
    selector: 'app-menu-top',
    templateUrl: './menu-top.component.html',
    styleUrls: ['./menu-top.component.scss'],
    providers: [ MenuTopService ]
})
export class MenuTopComponent implements OnInit {
    menuData;
    loginUser: User;
    isModifyModalShow: boolean = false;
    oldPwd: string;
    oldMsg: string;
    newPwd: string;
    newMsg: string;
    rePwd: string;
    reMsg: string;

    constructor(
        private $message: NzMessageService,
        private $service: MenuTopService,

        private $router: Router,
        private $mission: MissionService
    ) {
        $mission.loginStatusChangeHook.subscribe(user => {
            this.loginUser = user;
        });
    }

    ngOnInit() {
        this.menuData = this.$service.mockMenu();
        let _user = Utils.isUserLogin();
        if (_user) {
            this.loginUser = _user;
        }
    }
    navigate(item) {
        if (item.items.length === 0) {
            this.$router.navigate([item.router]);
        }
    }

    blur(param: string) {
        if (param === 'old') {
            this.validateOldPwd(this.oldPwd, result => {
                if (result.result === 0) {
                    this.oldMsg = result.msg;
                } else {
                    this.oldMsg = '';
                }
            });
        } else if (param === 'new') {
            this.validateNewPwd(this.newPwd, result => {
                if (result.result === 0) {
                    this.newMsg = result.msg;
                } else {
                    this.newMsg = '';
                }
            });
        } else if (param === 're') {
            this.validateRePwd(this.rePwd, result => {
                if (result.result === 0) {
                    this.reMsg = result.msg;
                } else {
                    this.reMsg = '';
                }
            });
        } else {

        }
    }

    logout() {
        Utils.loginOut();
        this.$mission.commitLoginStatusChange(null);
        this.$router.navigate([''])
    }

    openModal() {
        this.isModifyModalShow = true;
    }

    handleCancel() {
        this.isModifyModalShow = false;
        this.oldPwd = '';
        this.newPwd = '';
        this.rePwd = '';
        this.oldMsg = '';
        this.newMsg = '';
        this.reMsg = '';
    }

    handleOk() {
        this.validateOldPwd(this.oldPwd, result => {
            if (result.result === 1) {
                this.validateNewPwd(this.newPwd, result => {
                    if (result.result === 1) {
                        this.validateRePwd(this.rePwd, result => {
                            if (result.result === 1) {
                                this.$service.modifyPwd(this.loginUser.userId, this.oldPwd, this.newPwd, result => {
                                    this.$message.success('修改成功~');
                                    this.isModifyModalShow = false;
                                });
                            } else {
                                this.$message.error('请正确填写信息')
                            }
                        });
                    } else {
                        this.$message.error('请正确填写信息')
                    }
                })
            } else {
                this.$message.error('请正确填写信息')
            }
        });
    }

    private validateOldPwd(pwd: string, callback) {
        if (!pwd) {
            return callback( { result: 0, msg: '密码不能为空~' });
        }
        if (pwd.length < 3) {
            return callback( { result: 0, msg: '密码至少三位数~' });
        }
        return callback( { result: 1, msg: '' } );
    }

    private validateNewPwd(pwd: string, callback) {
        if (!pwd) {
            return callback( { result: 0, msg: '密码不能为空~' } );
        }
        if (pwd.length < 3) {
            return callback( { result: 0, msg: '密码至少三位数~' } );
        }
        if (pwd === this.oldPwd) {
            return callback( { result: 0, msg: '新密码不能和旧密码相同~' } );
        }
        return callback( { result: 1, msg: '' } );
    }

    private validateRePwd(pwd: string, callback) {
        if (pwd !== this.newPwd) {
            return callback( { result: 0, msg: '与新密码不一致~' } );
        }
        return callback( { result: 1, msg: '' } );
    }
}
