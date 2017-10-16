import { Component, OnInit } from '@angular/core';
import { UserManagerService } from './user-manager.service'
import { User } from '../../../models/User';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-user-manager',
    templateUrl: './user-manager.component.html',
    styleUrls: ['./user-manager.component.scss'],
    providers: [ UserManagerService ]
})
export class UserManagerComponent implements OnInit {
    data: User[] = [];
    isModelShow: boolean = false;
    currentUser: User;
    roles = [
        {
            value: 1,
            label: '基本角色'
        },
        {
            value: 2,
            label: '管理员'
        },
        {
            value: 3,
            label: '监控员'
        },
        {
            value: 4,
            label: '资产管理'
        }
    ];

    constructor(
        private $service: UserManagerService,
        private $message: NzMessageService
    ) { }

    modifyItem(user: User) {
        this.isModelShow = true;
        this.currentUser = user;
    }

    closeModal() {
        this.isModelShow = false;
        // this.currentUser = null;
    }

    saveUser() {

    }

    cancel(): void {
        // this.$message.info('取消~')
    }

    confirmDelete = () => {
        this.$message.info('删除成功~')
    };
    confirmState(user: User) {
        user.state = user.state === 1 ? 2 : 1;
        this.$message.info('success~')
    }
    ngOnInit() {
        this.data = this.$service.getAllUser();
        console.log(this.data);
    }
}
