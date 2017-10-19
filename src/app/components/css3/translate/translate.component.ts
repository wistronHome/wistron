import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {
    cRotateX: number = 0;
    cRotateY: number = 0;
    cRotateZ: number = 0;
    perspective: number = 600;
    originX: number = 70;
    originY: number = 70;
    constructor() { }

    ngOnInit() {

    }

}
