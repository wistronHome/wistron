import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UserManagerService } from './user-manager.service'
import { User, Password } from '../../../models/Models';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
    selector: 'app-user-manager',
    templateUrl: './user-manager.component.html',
    styleUrls: ['./user-manager.component.scss'],
    providers: [ UserManagerService ]
})
export class UserManagerComponent implements OnInit, OnChanges {
    data: User[] = [];
    isModalShow: boolean = false;
    password: Password;
    isModifyPasswordShow: boolean = false;
    currentUser: User;
    @Input() pageSize: number = 10;
    page: {
        pageSize: number,
        pageIndex: number,
        total: number
    } = {
        pageSize: 10,
        pageIndex: 1,
        total: 1
    };
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

    /**
     * 新增用户
     */
    createUser() {
        this.isModalShow = true;
        this.currentUser = new User();
    }

    /**
     * 修改用户
     * @param {User} user
     */
    modifyItem(user: User) {
        this.isModalShow = true;
        this.currentUser = this.cloneUser(user);
    }

    /**
     * 关闭修改用户弹框
     */
    closeModal() {
        this.isModalShow = false;
        // this.currentUser = null;
    }

    /**
     * 新增/修改 的保存按钮
     */
    saveUser() {
        if (this.currentUser.id) {
            if (this.$service.modifyUser(this.currentUser)) {
                this.isModalShow = false;
                this.$message.success('修改成功~');
            } else {
                this.$message.error('修改失败~');
            }
        } else {

        }
    }

    /**
     * 打开修改密码弹框
     * @param {User} user
     */
    modifyPassword(user: User) {
        this.isModifyPasswordShow = true;
        this.password = new Password();
        this.currentUser = this.cloneUser(user);
    }

    /**
     * 保存密码
     */
    savePassword() {
        console.log(this.password);
    }
    cancel(): void {
        // this.$message.info('取消~')
    }

    /**
     * 确认删除用户
     * @param {User} user
     */
    confirmDelete(user: User) {
        let result = this.$service.deleteUsers([user.id], this.pageSize, this.page.pageIndex);
        this.data = result.users;
        this.page.total = result.total;
        this.$message.info('删除成功~')
    };
    confirmState(user: User) {
        user.state = user.state === 1 ? 2 : 1;
        this.$message.info('success~')
    }
    ngOnInit() {
        let result = this.$service.getUserPagination({ pageSize: this.pageSize, pageIndex: this.page.pageIndex });
        this.data = result.users;
        this.page.total = result.total;
    }

    ngOnChanges(changes: SimpleChanges) {
        console.dir(changes);
    }


    private cloneUser(user: User): User {
        let _clone = new User();
        for (let key in user) {
            _clone[key] = user[key];
        }
        return _clone;
    }
}
