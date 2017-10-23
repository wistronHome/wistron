import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { MachineService } from './machine.service'
import { Room, Cabinet, Servicer } from '../../models/index';
import { fadeLeftIn } from "../../animations/fade-left-in";
import { NzMessageService, NzModalService } from 'ng-zorro-antd';


@Component({
    selector: 'app-machine',
    templateUrl: './machine.component.html',
    styleUrls: ['./machine.component.scss'],
    providers: [ MachineService ],
    animations: [
        fadeLeftIn
    ]
})
export class MachineComponent implements OnInit {
    data: Room[] = [];
    isCollapse: boolean = true;
    isVisible: boolean = false;
    searchValue: string = '';
    ass = {
        rooms: [],
        cabinets: [],
        servicers: []
    };

    constructor(
        private router: Router,
        private $message: NzMessageService,
        private $modal: NzModalService,
        private $service: MachineService
    ) { }

    ngOnInit() {
        this.data.push(this.$service.getMachines());
        this.data.push(this.$service.getMachines());
    }
    $watchSearch(currentValue) {
        this.searchValue = currentValue.trim();
        if (this.searchValue) {
            this.ass = {
                rooms: [],
                cabinets: [],
                servicers: []
            };
            this.data.forEach(room => {
                if (room.name.toUpperCase().includes(this.searchValue.toUpperCase())) {
                    if (this.ass.rooms.length < 5) {
                        let { id, name } = room;
                        this.ass.rooms.push({ id, name });
                    }
                }
                room.cabinets.forEach(cabinet => {
                    if (cabinet.name.toUpperCase().includes(this.searchValue.toUpperCase())) {
                        if (this.ass.cabinets.length < 5) {
                            this.ass.cabinets.push({
                                id: cabinet.id,
                                name: cabinet.name,
                                parent: room.name
                            });
                        }
                    }
                    cabinet.servicers.forEach(server => {
                        if (server.name.toUpperCase().includes(this.searchValue.toUpperCase())) {
                            if (this.ass.servicers.length < 5) {
                                this.ass.servicers.push({
                                    id: server.id,
                                    name: server.name,
                                    parent: room.name + ' => ' + cabinet.name
                                });
                            }
                        }
                    });
                });
            });
        } else {

        }
    }
    toggleMenu(item, ev) {
        item.isOpen = !item.isOpen;
        ev.stopPropagation();
    }
    createRoom() {
        this.isVisible = true;
    }

    /**
     * 接受子组件属性变化
     * @param {boolean} flag
     */
    onVoted(flag: boolean) {
        this.isVisible = flag;
    }

    saveRoom(): void {

    }
    toggleCollapse(): void {
        this.isCollapse = !this.isCollapse;
    }
}
