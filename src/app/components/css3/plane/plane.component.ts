import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plane',
  templateUrl: './plane.component.html',
  styleUrls: ['./plane.component.scss']
})
export class PlaneComponent implements OnInit {
    originX: number = 0;
    originY: number = 0;
    rotate: number = 0;
    scaleX: number = 1;
    scaleY: number = 1;
    skewX: number = 0;
    skewY: number = 0;
    translateX: number = 0;
    translateY: number = 0;
    constructor() { }

    ngOnInit() {
    }
    formatter(value) {
        return `${value}%`;
    }
}
