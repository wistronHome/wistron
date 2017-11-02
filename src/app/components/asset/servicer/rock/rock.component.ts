import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MissionService } from "../../../../mission-store/mission.service";
import { RockService } from './rock.service'
import { Rock } from "../../../../models";


@Component({
    selector: 'app-maintenance',
    templateUrl: './rock.component.html',
    styleUrls: ['./rock.component.scss'],
    providers: [ MissionService, RockService ]
})

export class RockComponent implements OnInit {
    search = {
        computerroomId: 0,
        bserverCode: '',
        bserverName: '',
        bserverProject: '',
        bserverUser: '',
        bserverBrand: '',
        bserverSeries: '',
        bserverModel: '',
        status: '',
        cabinetId: '',
        startU: ''
    };
    data = [];
    brand = [];
    _brand: any[] = [];
    rooms: Room[] = []; // 所有机房
    users = [];  // 所有责任人
    brands = []; // 所有品牌
    serieses = []; // 所有系列
    versions = []; // 所有型号
    _bsv: any[] = [];
    _room: any[] = [];
    rocks: Rock[] = [];
    isSearchOpen: boolean = false;
    pageSize: number = 20;
    pageIndex: number = 1;
    total: number = 1;

    allChecked = false; // 是否全选
    disabledButton = true;
    checkedNumber = 0;  // 选中数量
    operating = false; // 批量删除延迟
    indeterminate = false;
    sortMap = {
        name: null,
        number: null,
        model: null,
        room: null
    };
    sortName = null;
    sortValue = null;
    /**
     * 变更选中状态
     */
    refreshStatus() {
        const _allChecked = this.rocks.every(item => item.checked === true);
        const _allUnChecked = this.rocks.every(item => !item.checked);
        this.allChecked = _allChecked;
        this.indeterminate = (!_allChecked) && (!_allUnChecked);
        this.disabledButton = !this.rocks.some(item => item.checked);
        this.checkedNumber = this.rocks.filter(item => item.checked).length;
    };

    /**
     * 全选按钮
     * @param value
     */
    checkAll(value) {
        if (value) {
            this.rocks.forEach(user => {
                user.checked = true;
            });
        } else {
            this.rocks.forEach(user => {
                user.checked = false;
            });
        }
        this.refreshStatus();
    };

    /**
     * 批量删除
     */
    batchDelete() {
        this.operating = true;
        let ids: number[] = [];
        this.rocks.forEach(item => {
            ids.push(item.bserverId);
        });
        this.$service.deleteServers(ids, result => {
            this.refreshRock();
            this.operating = false;
        });
    };

    constructor(
        private $mission: MissionService,
        private $service: RockService,
        private $router: Router
    ) {
        $mission.pageChangeHook.subscribe(page => {
            this.pageIndex = page.pageIndex;
            this.pageSize = page.pageSize;
            this.allChecked = false; // 是否全选
            this.disabledButton = true;
            this.checkedNumber = 0;  // 选中数量
            this.refreshRock()
        });
    }

    ngOnInit() {
        this.refreshRock();
        this.$service.getAllRoom(result => {
            this.rooms = result;
        });
        this.$service.getAllUser(result => {
            console.log('user-', result);
            this.users = result.data;
        });
        this.$service.getAllBrand(result => {
            this.brands = result.data;
        });
    }
    toggleSearch() {
        this.isSearchOpen = !this.isSearchOpen;
        this._room = [];
        this._brand = [];
    }
    _console(value) {
        console.log(value);
    }
    createUser() {
        this.$router.navigate(['/asset/servicer/rock/-1']);
    }

    sort(sortName, value) {
        console.log(sortName, value);
        this.sortName = sortName;
        this.sortValue = value;
        Object.keys(this.sortMap).forEach(key => {
            if (key !== sortName) {
                this.sortMap[ key ] = null;
            } else {
                this.sortMap[ key ] = value;
            }
        });
    }

    /**
     * 模糊查询
     */
    public searchByField() {
        console.log(this.search);
        this.$service.getRockByField(this.pageIndex, this.pageSize, this.search, result => {
            this.rocks = result.data;
            this.total = result.totalCount;
        });
    }
    /**
     * 品牌/系列/型号  级联选择
     * @param {{option: any; index: number; resolve: Function; reject: Function}} e
     */
    public loadData(e: {option: any, index: number, resolve: Function, reject: Function}): void {
        if (e.index === -1) {
            this.$service.getAllCabinet(this.search.computerroomId, result => {
                let _result = [];
                result.cabinetSet.forEach(item => {
                    let {cabinetId: value, cabinetName: label} = item;
                    _result.push({value, label});
                });
                e.resolve(_result);
            });
        }
        if (e.index === 0) {
            const option = e.option;
            option.loading = true;
            this.$service.getAllSeries(option.value, result => {
                let _result = [];
                result.data.forEach(item => {
                    let {id: value, name: label, isLeaf = true} = item;
                    _result.push({value, label, isLeaf});
                });
                option.loading = false;
                e.resolve(_result);
            });
        }

    }

    /**
     * 上下架
     * @param {Rock} rock
     */
    public shelf(rock: Rock) {
        // 下架
        if (rock.computerRoomId) {
            this.$service.offShelves(rock.bsshelvesId, result => {
                console.log('------------', result);
            });
        } else {
            // 下架
        }
    }

    /**
     * 监听搜索条件“品牌”
     * @param ev
     */
    public brandChange(id) {
        this.$service.getAllSeries(id, result => {
            this.serieses = result.data;
        });
    }

    /**
     * 监听搜索条件“系列”
     * @param id
     */
    public seriesChange(id) {
        this.$service.getAllVersion(id, result => {
            this.versions = result.data;
        })
    }

    private refreshRock() {
        this.$service.getRockByField(this.pageIndex, this.pageSize, {}, result => {
            this.rocks = result.data;
            this.total = result.totalCount;
        });
    }
}

class Room {
    public roomId: number;
    public roomImage: string;
    public roomLength: number;
    public roomMaxCabinet: string;
    public roomName: string;
    public roomRemark: string;
    public roomWith: string;

    constructor() {

    }
}
