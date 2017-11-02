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
    serverInfo = null;
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
            this.$service.getRockDetailById(params.id, result => {
                console.log('serverInfo', result);
                this.serverInfo = result;
                this.$service.getAllSeries(this.serverInfo.bserverBrand, result => {
                    this.serieses = result.data;
                });
                this.$service.getAllVersion(this.serverInfo.bserverSeries, result => {
                    this.versions = result.data;
                });
                this.$service.getCabinetById(this.serverInfo.computerroomId, result => {
                    this.cabinets = result.cabinetSet;
                });
            });
            this.$service.getHardwareById(params.id, result => {
                this.hardwareInfo = result;
            });
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
