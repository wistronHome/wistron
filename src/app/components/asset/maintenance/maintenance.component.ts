import { Component, OnInit } from '@angular/core';
import { MissionService } from '../../../mission-store/mission.service'
import { MaintenanceService } from './maintenance.service'


@Component({
    selector: 'app-maintenance',
    templateUrl: './maintenance.component.html',
    styleUrls: ['./maintenance.component.scss'],
    providers: [ MissionService, MaintenanceService ]
})

export class MaintenanceComponent implements OnInit {
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
    isSearchOpen: boolean = false;
    pageSize: number = 10;
    pageIndex: number = 1;
    total: number = 1;

    constructor(
        private $mission: MissionService,
        private $service: MaintenanceService
    ) { }

    ngOnInit() {
        this.brand = this.$service.getBrand();
        this.room = this.$service.getRoom();
    }
    toggleSearch() {
        this.isSearchOpen = !this.isSearchOpen;
        this._room = [];
        this._brand = [];
    }
    _console(value) {
        console.log(value);
    }
}
