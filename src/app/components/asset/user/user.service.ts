import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User, Role, Result } from '../../../models/index'

@Injectable()
export class UserService {
    constructor(
        private $http: HttpClient
    ) { }

    /**
     * 分页获取用户信息
     * @param {number} pageIndex
     * @param {number} pageSize
     * @returns {{users: User[]; total: number}}
     */
    public getUserPagination(pageIndex: number, pageSize: number, callback) {
        let _users: User[] = [];
        this.$http.get(`/itm/users/${ pageSize }/${ pageIndex }`).subscribe((result: Result) => {
            if (result.code === 0) {
                callback({users: result.data.data, total: result.data.totalCount});
            }
        });
    }

    /**
     * 模糊查询用户列表
     * @param {{userCode: string; userName: string; userStatus: string; pageSize: number; pageNum: number}} query
     * @param callback
     */
    public getUserByField(query: {
            userCode: string,
            userName: string,
            userStatus: string,
            pageSize: number,
            pageNum: number}, callback
        ) {
        console.log(query);
        this.$http.post(`/itm/users/termQuery`, query).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback({
                    users: result.data.data,
                    total: result.data.total
                });
            }
        });
    }

    /**
     * 获取所有角色
     * @returns {any}
     */
    public getAllRoles(): any {
        let _roles: Role[] = [];
        this.$http.get(`/itm/roles/10/1`).subscribe((result: Result) => {
            if (result.code === 0) {
                result.data.data.forEach((item: Role) => {
                    _roles.push(item);
                });
            }
        });
        return Promise.resolve(_roles);
    }

    /**
     * 分页查询角色列表
     * @param {number} pageIndex
     * @param {number} pageSize
     * @param callback
     */
    public getRolesPagination(pageIndex: number, pageSize: number, callback) {
        this.$http.get(`/itm/roles/${pageSize}/${pageIndex}`).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback({ roles: result.data.data, total: result.data.totalCount });
            }
        });
    }

    /**
     * 新增用户
     * @param {User} user
     */
    public insertUser(user: User, callback): void {
        this.$http.post('/itm/users', user).subscribe(result => {
            callback({ok: true});
        });
    }

    /**
     * 用户名校验
     * @param {string} userName
     */
    public userNameValidate(userName: string, userId: number, callback) {
        let _result = null;
        this.$http.get(`/itm/users/userName/${userName}/${userId}`).subscribe((result: Result) => {
            if (result.code === 0) {
                _result = { ok: true };
            } else {
                _result = { ok: false, msg: result.msg };
            }
            callback(_result);
        });
    }

    /**
     * 修改用户信息
     * @param {User} user
     * @param callback
     */
    public modifyUser(user: User, callback) {
        this.$http.put('/itm/users', user).subscribe((result: Result) => {
            if (result.code === 0) {
                callback({ok: true});
            } else {
                callback({ok: false, msg: result.msg});
            }
        });
    }

    /**
     * 删除多条用户
     * @param {string[]} ids
     * @param callback
     */
    public deleteUsers(userIds: number[], callback) {
        this.$http.post(`/itm/users/deleteUsers`, userIds).subscribe((result: Result) => {
            if (result.code === 0) {
                callback({ok: true});
            }
        });
    }

    /**
     * 停用/启用状态
     * @param {string} status 0:停用  1:启用
     * @param {number} id
     * @param callback
     */
    public changeStatus(userId: number, callback) {
        this.$http.put(`/itm/users/status/${userId}`, {}).subscribe((result: Result) => {
            if (result.code === 0) {
                callback({ok: true});
            }
        })
    }

    /**
     * 修改密码
     * @param {number} userId
     * @param {string} password
     * @param callback
     */
    public modifyPassword(userId: number, password: string, callback) {
        let body = { userId: userId, password: password };
        this.$http.put(`/itm/users/reset`, body).subscribe((result: Result) => {
            if (result.code === 0) {
                callback({ok: true});
            }
        });
    }

    /**
     * 查询在线用户
     * @param {number} pageSize
     * @param {number} pageIndex
     * @param callback
     */
    public getOnlineUserPagination(pageSize: number, pageIndex: number, callback) {
        this.$http.get(`/itm/queryOnline/${pageSize}/${pageIndex}`).subscribe((result: Result) => {
            if (result.code === 0) {
                callback({ users: result.data.data, total: result.data.totalCount });
            }
        });
    }

    /**
     * 强制下线
     * @param {number} userId
     * @param callback
     */
    public offline(userName: string, callback) {
        this.$http.delete(`/itm/offline/${userName}`).subscribe((result: Result) => {
            if (result.code === 0) {
                callback({ok: true})
            }
        });
    }

    /**
     * 模糊查询角色
     * @param {string} pageIndex
     * @param {string} pageSize
     * @param {string} roleName
     * @param callback
     */
    public getRolesByField(pageIndex: number, pageSize: number, roleName: string, callback) {
        this.$http.post(`/itm/roles/termQuery`, {pageSize, pageNum: pageIndex, roleName}).subscribe((result: Result) => {
            if (result.code === 0) {
                callback({roles: result.data.data, total: result.data.totalCount});
            }
        });
    }
}
