import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

const LH: number = 17;
const LN: number = 42;
let LINE_ARR = [];
for (let i = 0; i < LH; i++) {
    LINE_ARR.push(0);
}

@Component({
    selector: 'app-cabinet',
    templateUrl: './cabinet.component.html',
    styleUrls: ['./cabinet.component.scss'],
    animations: [
        trigger('heroState', [
            state('inactive', style({
                opacity: 0,
                display: 'none'
            })),
            state('active', style({
                opacity: 1,
                display: 'block'
            })),
            transition('active => inactive', [
                animate('0.3s ease-out', style({
                    display: 'none',
                    opacity: 0,
                    transform: 'translateX(100%)'
                }))
            ]),
            transition('inactive => active', [
                style({
                    transform: 'translateX(100%)'
                }),
                animate('0.3s ease-out', style({
                    opacity: 1,
                    display: 'block',
                    transform: 'translateX(0)'
                }))
            ])
        ])
    ]
})

export class CabinetComponent implements OnInit {
    Q = window['Q'];
    state: string = 'active';
    graph = null;
    image: string = './assets/image/cabinet-a-1.png';
    height: number = LH;
    facility = null;
    constructor(
        // private http: HttpClient,
        private router: Router,
        private aRouter: ActivatedRoute
    ) { }

    ngOnInit() {
        this.graph = new this.Q.Graph('canvas');
        /**
         * 过滤选中
         * @param e
         * @returns {boolean}
         */
        this.graph.isSelectable = function (e) {
            if (e.get('selected') && e.get('selected') === 'unselected') {
                return false;
            }
            return true;
        };
        /**
         * 拖拽图元
         * @param evt
         */
        this.graph.enddrag = evt => {
            if (evt.getData() && !evt.getData().get('selected')) {
                evt.getData().x = 0;
                evt.getData().y = this.amendCoordinate(evt.getData().y, evt.getData().size.height);
            }
        };
        /**
         * 点击图元
         * @param evt
         */
        this.graph.onclick = evt => {
            if (evt.getData() && !evt.getData().get('selected')) {
                let {id, name, image, size} = evt.getData();
                this.facility = {id, name, image, size};
            } else {
                this.facility = null;
            }
        };
        // this.graph.originAtCenter = false;
        let node = new this.Q.Node();
        node.x = 0;
        node.y = 0;
        node.set('selected', 'unselected');
        node.image = '../../../assets/image/cabinet.png';
        node.setStyle(this.Q.Styles.HEIGHT, 30);
        this.graph.graphModel.add(node);
        for (let i = 0; i <= LN; i++) {
            let line = this.graph.createShapeNode();
            line.setStyle(this.Q.Styles.SHAPE_STROKE_STYLE, '#999');
            line.setStyle(this.Q.Styles.SHAPE_LINE_DASH, [2, 2]);
            line.set('selected', 'unselected');
            line.moveTo(-100, -LH * LN / 2 + i * LH);
            line.lineTo(100, -LH * LN / 2 + i * LH);
            this.graph.graphModel.add(line);
        }
    }
    toggle(): void {
        if (this.state === 'active') {
            this.state = 'inactive';
        } else {
            this.state = 'active';
        }
    }
    dragstart(ev): void {
        console.log('dragstart');
    }
    drop(ev): void {
        let node = new this.Q.Node();
        var p = this.graph.globalToLocal(ev);
        var l = this.graph.toLogical(p.x, p.y);
        node.size = {width: 200, height: parseInt(this.image.split('-')[2].split('.')[0]) * LH};
        node.x = 0;
        node.y = this.amendCoordinate(l.y, node.size.height, LH, LN);
        node.image = this.image + '';
        this.graph.graphModel.add(node);
    }
    dragover(ev): void {
        console.log('dragover');
    }

    /**
     * 坐标修正
     * @param {number} y
     * @param {number} itemLh
     * @param {number} lh
     * @param {number} ln
     * @returns {number}
     */
    private amendCoordinate(y: number, itemLh: number, lh: number = 17, ln: number = 42): number {
        let _yMax = lh * (Math.ceil(ln / 2) - 1),
            _yMin = -lh * Math.ceil(ln / 2);
        let _num = Math.round((y - _yMin) / lh) * lh + _yMin;
        _num = _num < _yMin ? _yMin : _num > _yMax ? _yMax : _num;
        if ((itemLh / 17) % 2 !== 0) {
            _num += lh / 2;
        }
        if (_num >= _yMax + lh - itemLh/ 2) {
            _num = _yMax + lh - itemLh / 2;
        } else if (_num <= _yMin + itemLh / 2) {
            _num = _yMin + itemLh / 2;
        }
        return _num;
    }
}
