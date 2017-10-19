import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
    grayscale: number = 0;
    sepia: number = 0;
    saturate: number = 0;
    hueRotate: number = 0;
    invert: number = 0;
    opacity: number = 0;
    contrast: number = 0;
    blur: number = 0;
    dropShadow: number = 0;
    constructor() { }

    ngOnInit() {
    }

}
