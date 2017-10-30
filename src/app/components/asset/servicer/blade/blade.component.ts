import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-blade',
    templateUrl: './blade.component.html',
    styleUrls: [ './blade.component.scss' ]
})

export class BladeComponent implements OnInit {
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
    assets = [];
    isSearchOpen: boolean = false;
    pageSize: number = 20;
    pageIndex: number = 1;
    total: number = 1;

    allChecked = false; // 是否全选
    disabledButton = true;
    checkedNumber = 0;  // 选中数量
    operating = false; // 批量删除延迟
    indeterminate = false;
    ngOnInit() {

    }
}
