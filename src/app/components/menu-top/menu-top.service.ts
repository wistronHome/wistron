import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Result } from "../../models/result";

@Injectable()
export class MenuTopService {

    constructor(
        private $http: HttpClient
    ) { }

    public mockMenu() {
        return [
            {
                name: '首页',
                router: '/asset',
                items: []
            },
            {
                name: '资源',
                router: '/asset',
                items: [
                    { name: '网管概览', items: [] },
                    { name: '机柜', items: []},
                    { name: '主机', items: [
                        { name: '设备', items: [
                            { name: '网络设备', items: []},
                            { name: '单卡', items: []},
                            { name: '子卡', items: []}
                        ]},
                        { name: '配置', items: [
                            { name: 'SVF配置管理', items: []},
                            { name: '设备软件管理', items: []},
                            { name: '智能配置工具', items: []}
                        ]},
                        { name: '业务', items: []},
                    ]},
                    { name: 'BMC', items: []}
                ]
            },
            {
                name: '拓扑',
                router: '/asset',
                items: [
                    { name: '业务图', items: [
                        { name: '告警', items: []},
                        { name: '拖拽', items: []},
                        { name: '修改属性', items: []}
                    ] },
                    { name: '机房布局图', items: []},
                    { name: '机柜图', items: []}
                ]
            },
            {
                name: '告警',
                router: '/machine',
                items: []
            },
            {
                name: '监控',
                router: '/asset',
                items: []
            },
            {
                name: '报表',
                router: '/asset',
                items: []
            },
            {
                name: '系统',
                router: '/asset',
                items: [
                    { name: '用户', items: [] },
                    { name: '日志', items: [] }
                ]
            },
            {
                name: '资产管理',
                router: '/asset',
                items: []
            }
        ]
    }

    /**
     * 修改密码
     * @param {number} userId
     * @param {string} oldPassword
     * @param {string} password
     * @param {Function} callback
     */
    public modifyPwd(userId: number, oldPassword: string, password: string, callback: Function) {
        let body = { userId, oldPassword, password };
        console.log(body);
        this.$http.put(`/itm/users/password`, body).subscribe((result: Result) => {
            console.log('repwd', result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    public logout() {
        this.$http.delete(`/itm/logout`)
    }
}

