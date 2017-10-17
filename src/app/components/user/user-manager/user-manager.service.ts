import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../../models/User';

@Injectable()
export class UserManagerService {
    users: User[] = this.getAllUser();
    constructor(
        private $http: HttpClient
    ) { }

    /**
     * 获取所有用户
     * @returns {Promise<User[]>}
     */
    public getAllUser(): User[] {
        let tmp: User[] = [];
        for (let i = 0; i < 22; i++) {
            tmp.push(this.createUser());
        }
        return tmp;
    }

    /**
     * 分页获取用户信息
     * @param {number} pageIndex
     * @param {number} pageSize
     * @returns {{users: User[]; total: number}}
     */
    public getUserPagination(pageIndex: number, pageSize: number): Promise<{ users: User[], total: number }> {
        let _users: User[] = [];
        for (let i = pageSize * (pageIndex - 1); i < pageSize * pageIndex && i < this.users.length; i++) {
            _users.push(this.users[i]);
        }
        return Promise.resolve({ users: _users, total: this.users.length});
    }

    /**
     * 修改用户信息
     * @param {User} user
     * @returns {{result: boolean}}
     */
    public modifyUser(user: User): Promise<{ result: boolean }> {
        this.users.forEach(item => {
            if (item.id === user.id) {
                item.name = user.name;
                item.state = user.state;
                item.role = user.role;
                item.email = user.email;
                item.code = user.code;
                item.phone = user.phone;
            }
        });
        return Promise.resolve({result: true});
    }

    /**
     * 删除n条用户
     * @param {string[]} ids
     * @returns {User[]}
     */
    public deleteUsers(ids: string[], pageSize: number, pageIndex: number): Promise<{ users: User[], total: number }> {
        let users: User[] = [];
        this.users.forEach(item => {
            if (!ids.includes(item.id)) {
                users.push(item);
            }
        });
        this.users = users;
        let _users: User[] = [];
        for (let i = pageSize * (pageIndex - 1); i < pageSize * pageIndex && i < this.users.length; i++) {
            _users.push(this.users[i]);
        }
        return Promise.resolve({ users: _users, total: this.users.length });
    }

    public getDemo() {
        this.$http.get('/api/mongo/list').subscribe(result => {
            console.log(result);
        });
    }






    private createUser(): User {
        let user = new User();
        let _random = this.getRandomColor();
        let _phone = this.getPhone();
        user.id = 'id' + _random;
        user.name = 'name' + _random;
        user.code = _random;
        user.state = this.getState(2);
        user.email =  _phone + '@163.com';
        user.phone = _phone;
        user.role = this.getState(4);
        user.password = '123456';
        user.checked = false;
        return user;
    }

    private getRandomColor(): string {
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    private getPhone() {
        return parseInt('139' +  (Math.floor(Math.random() * 89999999) + 10000000));
    }
    private getState(limit) {
        return Math.ceil(Math.random() * limit);
    }
}
