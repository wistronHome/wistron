import { Component, OnInit, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Router } from '@angular/router';

import { Room, Cabinet, Servicer } from '../models/Models';
import { fadeLeftIn } from "../animations/fade-left-in";
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CreateRoomModalComponent } from "./create-room-modal/create-room-modal.component";
// import {
//     FormBuilder,
//     FormGroup,
//     Validators
// } from '@angular/forms';
// @NgModule({
//     declarations: [
//         CreateRoomModalComponent
//     ],
//     imports: [BrowserModule ],
//     bootstrap: [MachineComponent]
// })

@Component({
    selector: 'app-machine',
    templateUrl: './machine.component.html',
    styleUrls: ['./machine.component.scss'],
    animations: [
        fadeLeftIn
    ]
})
export class MachineComponent implements OnInit {
    data: Room[] = [];
    isCollapse: boolean = true;
    isVisible: boolean = false;
    constructor(
        private router: Router,
        private $message: NzMessageService,
        private $modal: NzModalService
    ) { }

    ngOnInit() {
        this.data.push(this.mock());
        this.data.push(this.mock());
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
    private mock(): Room {
        let room = new Room();
        room.id = 'id_' + this.getRandom();
        room.name = '机房_' + this.getRandom();
        for (let i = 0; i < 5; i++) {
            let cabinet = new Cabinet();
            cabinet.id = 'id_' + this.getRandom();
            cabinet.name = '机柜_' + this.getRandom();
            for (let i = 0; i < 6; i++) {
                let servicer = new Servicer();
                servicer.id = 'id_' + this.getRandom();
                servicer.name = '服务器_' + this.getRandom();
                cabinet.addServicer(servicer);
            }
            room.addCabinet(cabinet);
        }
        return room;
    }

    private getRandom() {
        let color = '';
        for (let i = 0; i < 6; i++) {
            color += '0123456789abcdef'[Math.floor(Math.random() * 16)];
        }
        return '#' + color;
    }
}
