import { Component, OnInit, Input } from '@angular/core';
import { UserManagerService } from './user-manager.service'
import { User, Password } from '../../../models/Models';
import { NzMessageService } from 'ng-zorro-antd';
import { MissionService } from '../../../mission-store/mission.service';

@Component({
    selector: 'app-user-manager',
    templateUrl: './user-manager.component.html',
    styleUrls: ['./user-manager.component.scss'],
    providers: [ UserManagerService, MissionService ]
})
export class UserManagerComponent implements OnInit {
    data: User[] = [];
    isModalShow: boolean = false;
    password: Password;
    isModifyPasswordShow: boolean = false;
    currentUser: User;
    pageSize: number = 10;
    pageIndex: number = 1;
    total: number = 1;
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
        private $message: NzMessageService,
        private $mission: MissionService
    ) {
        // 订阅页码改变事件
        $mission.pageChangeHook.subscribe(page => {
            this.pageSize = page.pageSize;
            this.pageIndex = page.pageIndex;
            this.$service.getUserPagination( this.pageIndex, this.pageSize ).then(result => {
                this.data = result.users;
                this.total = result.total;
            });
        });
    }

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
        this.$service.deleteUsers([user.id], this.pageSize, this.pageIndex).then(result => {
            this.data = result.users;
            this.total = result.total;
            this.$message.info('删除成功~')
        });
    };

    /**
     * 启用/停用
     * @param {User} user
     */
    confirmState(user: User) {
        user.state = user.state === 1 ? 2 : 1;
        this.$message.info('success~')
    }
    ngOnInit() {
        this.$service.getUserPagination( this.pageIndex, this.pageSize ).then(result => {
            this.data = result.users;
            this.total = result.total;
        });
    }

    private cloneUser(user: User): User {
        let _clone = new User();
        for (let key in user) {
            _clone[key] = user[key];
        }
        return _clone;
    }
}
