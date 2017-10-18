import { Injectable } from '@angular/core';

@Injectable()
export class MenuTopService {

    constructor() { }

    public mockMenu() {
        return [
            {
                name: '首页',
                items: []
            },
            {
                name: '资源',
                items: [
                    { name: '服务器', items: [] },
                    { name: '存储', items: []},
                    { name: '网络', items: [
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
                    { name: '协作', items: []}
                ]
            },
            {
                name: '拓扑',
                items: [
                    { name: '服务器', items: [] },
                    { name: '存储', items: []},
                    { name: '网络', items: [
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
                    { name: '协作', items: []}
                ]
            },
            {
                name: '告警',
                items: []
            },
            {
                name: '性能',
                items: []
            },
            {
                name: '报表',
                items: []
            },
            {
                name: '业务服务',
                items: []
            },
            {
                name: '大屏',
                items: []
            },
            {
                name: '系统',
                items: [
                    { name: '服务器', items: [] },
                    { name: '存储', items: []},
                    { name: '网络', items: [
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
                    { name: '协作', items: []}
                ]
            }
        ]
    }
}

