import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-three-dimensional',
  templateUrl: './three-dimensional.component.html',
  styleUrls: ['./three-dimensional.component.scss']
})
export class ThreeDimensionalComponent implements OnInit {
    private wrapWidth: number;
    private wrapHeight: number;

    perspective: number = 600;
    isOrigin: boolean = false;
    origin = {
        x: 30,
        y: 30
    };
    componentRotate = {
        x: 0,
        y: 0,
        z: 0
    }
    itemTrans = {
        x: 250,
        y: 250,
        z: 0
    }
    constructor() { }

    ngOnInit() {
        let $wrap = document.getElementById('tdWrap');
            this.wrapWidth = $wrap.clientWidth;
            this.wrapHeight = $wrap.clientHeight;
        $wrap.onmousemove = ev => {
            if (this.isOrigin) {
                this.origin.x = Math.round(ev.x / this.wrapWidth * 100);
                this.origin.y = Math.round((ev.y - 40) / this.wrapHeight * 100);
            }
        };
        document.onmouseup = ev => {
            this.isOrigin = false;
        };
    }
    mousedown(ev) {
        if (ev.target.nodeName === 'I' && ev.target.parentNode.id === 'eye' || ev.target.id === 'eye') {
            let $wrap = document.getElementById('tdWrap');
            this.wrapWidth = $wrap.clientWidth;
            this.wrapHeight = $wrap.clientHeight;
            this.isOrigin = true;
        }
    }
}
