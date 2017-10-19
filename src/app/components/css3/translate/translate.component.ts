import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {
    cRotateX: number = 50;
    cRotateY: number = 10;
    cRotateZ: number = 10;
    perspective: number = 600;
    originX: number = 70;
    originY: number = 70;
    constructor() { }

    ngOnInit() {
        setInterval(() => {
            this.cRotateX = Math.random() * 180;
            this.cRotateY = Math.random() * 180;
            this.cRotateZ = Math.random() * 180;
            // this.perspective += 100;
        }, 1000);
    }

}
