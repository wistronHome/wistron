import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Room, Cabinet, Servicer } from '../models/Models';
import { fadeLeftIn } from "../animations/fade-left-in";

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
    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        this.data.push(this.mock());
        this.data.push(this.mock());
    }
    toggleMenu(item, ev) {
        item.isOpen = !item.isOpen;
        ev.stopPropagation();
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
