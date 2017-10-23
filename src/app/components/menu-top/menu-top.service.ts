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
                items: []
            },
            {
                name: '监控',
                items: []
            },
            {
                name: '报表',
                items: []
            },
            {
                name: '系统',
                items: [
                    { name: '用户', items: [] },
                    { name: '日志', items: [] }
                ]
            },
            {
                name: '资产管理',
                items: []
            }
        ]
    }
}

