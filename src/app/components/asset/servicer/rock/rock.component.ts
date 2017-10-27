import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { MissionService } from "../../../../mission-store/mission.service";
import { RockService } from './rock.service'
import { Asset } from "../../../../models/asset";


@Component({
    selector: 'app-maintenance',
    templateUrl: './rock.component.html',
    styleUrls: ['./rock.component.scss'],
    providers: [ MissionService, RockService ]
})

export class RockComponent implements OnInit {
    search = {
        code: '',
        name: '',
        state: 0
    };
    data = [];
    brand = [];
    _brand: any[] = [];
    room = [];
    _room: any[] = [];
    assets: Asset[] = [];
    isSearchOpen: boolean = false;
    pageSize: number = 20;
    pageIndex: number = 1;
    total: number = 1;

    allChecked = false; // 是否全选
    disabledButton = true;
    checkedNumber = 0;  // 选中数量
    operating = false; // 批量删除延迟
    indeterminate = false;

    /**
     * 变更选中状态
     */
    refreshStatus() {
        const _allChecked = this.assets.every(item => item.checked === true);
        const _allUnChecked = this.assets.every(item => !item.checked);
        this.allChecked = _allChecked;
        this.indeterminate = (!_allChecked) && (!_allUnChecked);
        this.disabledButton = !this.assets.some(item => item.checked);
        this.checkedNumber = this.assets.filter(item => item.checked).length;
    };

    /**
     * 全选按钮
     * @param value
     */
    checkAll(value) {
        if (value) {
            this.assets.forEach(user => {
                user.checked = true;
            });
        } else {
            this.assets.forEach(user => {
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
        setTimeout(() => {
            this.assets.forEach(asset => asset.checked = false);
            this.refreshStatus();
            this.operating = false;
        }, 1000);
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
            this.$service.getAssetPagination(this.pageIndex, this.pageSize).then(result => {
                this.assets = result.assets;
                console.log(this.assets);
                this.total = result.total;
            });
        });
    }

    ngOnInit() {
        this.brand = this.$service.getBrand();
        this.room = this.$service.getRoom();
        this.$service.getAssetPagination(this.pageIndex, this.pageSize).then(result => {
            this.assets = result.assets;
            this.total = result.total;
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

    sortMap = {
        name: null,
        number: null,
        model: null,
        room: null
    };
    sortName = null;
    sortValue = null;

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
}
