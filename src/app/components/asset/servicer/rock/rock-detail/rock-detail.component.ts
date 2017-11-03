import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { RockDetailService } from "./rock-detail.service";
import { Brand, Series, Version, User } from "../../../../../models";

const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
            isLeaf: true
        }],
    }, {
        value: 'ningbo',
        label: 'Ningbo',
        isLeaf: true
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            isLeaf: true
        }],
    }],
}];

@Component({
    selector: 'app-rock-detail',
    templateUrl: './rock-detail.component.html',
    styleUrls: [ './rock-detail.component.scss' ],
    providers: [ RockDetailService ]
})
export class RockDetailComponent implements OnInit {
    style = {
        'background': '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        'border': '0px'
    };
    data = [];
    brands: Brand;
    serieses: Series;
    versions: Version;
    users: User;
    cabinets;
    rooms;
    serverInfo: ServerInfo;
    hardwareInfo = null;
    constructor(
        private $router: Router,
        private $active: ActivatedRoute,
        private $service: RockDetailService
    ) { }

    ngOnInit() {
        this.$active.params.subscribe(params => {
            this.$service.getAllRoom(result => {
                this.rooms = result;
            });
            this.$service.getAllUser(result => {
                this.users = result.data;
            });
            this.$service.getAllBrand(result => {
                this.brands = result.data;
            });
            if (params.id === -1 || params.id === '-1') {
                this.serverInfo = new ServerInfo();
                console.log('hibi', this.serverInfo);
            } else {
                this.$service.getRockDetailById(params.id, result => {
                    this.serverInfo = result;
                    this.$service.getAllSeries(this.serverInfo.bserverBrand, result => {
                        this.serieses = result.data;
                    });
                    this.$service.getAllVersion(this.serverInfo.bserverSeries, result => {
                        this.versions = result.data;
                    });
                    this.$service.getCabinetById(this.serverInfo.computerRoomId, result => {
                        this.cabinets = result.cabinetSet;
                    });
                });
                this.$service.getHardwareById(params.id, result => {
                    this.hardwareInfo = result;
                });
            }
        });
    }

    brandChange(id) {
        this.$service.getAllSeries(id, result => {
            this.serieses = result.data;
            this.serverInfo.bserverSeries = -1;
        });
    }
    seriesChange(id) {
        this.$service.getAllVersion(id, result => {
            this.versions = result.data;
            this.serverInfo.bserverModel = -1;
        });
    }
    roomChange(id) {
        this.$service.getCabinetById(id, result => {
            this.serverInfo.cabinetId = 0;
            this.cabinets = result.cabinetSet;
        });
    }
    cabinetChange(id) {
        console.log(id);
    }
    _options = options;

    /* _value: any[] = ['zhejiang', 'hangzhou', 'xihu']; */
    /* or like this: */
    _value: any[] = [{
        value: 'zhejiang',
        label: 'Zhejiang'
    }, {
        value: 'hangzhou',
        label: 'Hangzhou'
    }, {
        value: 'xihu',
        label: 'West Lake'
    }];

    _console(value) {
        console.log(value);
    }

}

export class ServerInfo {
    public bserverId: number;
    public bserverCode: string; // 服务器编号
    public bserverName: string; // 服务器名称
    public bserverKey: string; // 序列号
    public bserverBmc: string; // BMCIP
    public bserverIp: string; // 带内ip
    public bserverBrand: number; // 品牌id
    public bserverSeries: number; // 系列id
    public bserverModel: number; // 型号id
    public bserverProject: string; // 所属项目
    public bserverFirstuser: string; // 第一责任人用户id
    public bserverSeconduser: string; // 第二责任人id
    public bserverMaxdisknumbe: string; // 最大磁盘托架数
    public occupyU: string; // 服务器所占U位
    public remarks: string; // 备注
    public protocolList: Protocol[];
    public brandName: string; // 品牌
    public seriesName: string; // 系列
    public model: string; // 型号
    public computerroomName: string; // 机房
    public cabinetName: string; // 机柜
    public uName: string; // 起始U位
    public bsshelvesId: string; // 服务器上架ID
    public computerRoomId: number; // 机房ID
    public cabinetId: number; // 机柜ID
    public startU: string; // 起始U位
    public protocolType: string; // 类型          1:(SNMP );2:(IPMI);3:(REDFISH);4:(带内)',
    public snmpType: string; // SNMP类型 1:(V2C);2:(V3);
    public port: string; // 端口(1-65535）
    public groupWord: string; // 团体字
    public userName: string; // 用户名
    public authenticationPassword: string; // 认证密码
    public authenticationProtocol: string; // 认证协议（1:HMACSHA;2:HMACMD5）
    public dataEncryption: string; // 数据加密协议(1:AES;2:DES)
    public dataEncryptioncipher: string; // 数据加密密码
    public password: string; // 密码
    public bandIp: string; // 带内IP

    constructor() {
        this.protocolList = [new Protocol()];
    }
}

class Protocol {
    public id: number;
    public bserverId: number;
    public protocolType: number;
    public snmpType: string;
    public port: string;
    public groupWord: string;
    public userName: string;
    public authenticationPassword: string;
    public authenticationProtocol: string;
    public dataEncryption: string;
    public dataEncryptioncipher: string;
    public password: string;
    public bandIp: string;
}
