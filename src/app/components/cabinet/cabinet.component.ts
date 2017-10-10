import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { fadeLeftIn } from "../animations/fade-left-in"
import { Servicer, ServerType, Facility } from "../models/Models";

const LH: number = 17;
const LN: number = 42;
const IMAGE = {
    A: './assets/image/cabinet-a-1.png',
    B: './assets/image/cabinet-b-4.png',
    C: './assets/image/cabinet-c-3.png'
};

@Component({
    selector: 'app-cabinet',
    templateUrl: './cabinet.component.html',
    styleUrls: ['./cabinet.component.scss'],
    animations: [ fadeLeftIn ]
})

export class CabinetComponent implements OnInit {
    Q = window['Q'];
    /**
     * 记录侧边栏展开/关闭信息，结合特效
     * @type {string}
     */
    legendState: string = 'inactive';
    facilityState: string = 'inactive';
    data: Servicer[] = [];
    menuData = [];
    graph = null;
    /**
     * 机柜模型图
     * @type {string}
     */
    image: string;
    height: number = LH;
    facility = null;
    constructor(
        // private http: HttpClient,
        private router: Router,
        private aRouter: ActivatedRoute
    ) { }

    ngOnInit() {
        let facility = new Facility();
        for (let key of Object.keys(facility)) {
            this.menuData.push({
                key: key,
                name: facility[key]
            });
        }
        /**
         * mock数据
         */
        setTimeout(() => {
            this.data.push(this.mock());
            this.data.push(this.mock());
            this.data.push(this.mock());
        }, 5000);


        this.graph = new this.Q.Graph('canvas');
        this.graph.enableTooltip = true;
        this.graph.tooltipDelay = 0;
        this.graph.tooltipDuration = 10000;


        this.Q.registerImage('warning', '../../../assets/svg/warn.svg');
        /**
         * 过滤选中
         * @param e
         * @returns {boolean}
         */
        this.graph.isSelectable = function (e) {
            return !e.get('selected') || e.get('selected') !== 'unselected';
        };
        /**
         * 拖拽图元
         * @param evt
         */
        this.graph.enddrag = evt => {
            if (evt.getData() && !evt.getData().get('selected')) {
                evt.getData().x = 0;
                evt.getData().y = Util.amendCoordinate(evt.getData().y, evt.getData().size.height);
                Util.amendWarning(evt.getData(), evt.getData().host);
            }
        };
        /**
         * 点击图元
         * @param evt
         */
        this.graph.onclick = evt => {
            this.facilityState = 'inactive';
            this.legendState = 'inactive';
            let item = evt.getData();
            if (item && !item.get('selected')) {
                this.facilityState = 'active';
                // let {id, name, image, size} = evt.getData();
                // this.facility = {id, name, image, size};
                // let type = item.get('type');
                // if (type) {
                //     if (type === 'warn') {
                //         alert('warn');
                //     }
                // }
            } else {
                // this.facility = null;
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

    /**
     * 展开/关闭 侧边栏
     */
    toggle(param): void {
        if (param === 'a') {
            this.facilityState = 'inactive';
            if (this.legendState === 'active') {
                this.legendState = 'inactive';
            } else {
                this.legendState = 'active';
            }
        } else if(param === 'b') {
            this.legendState = 'inactive';
            if (this.facilityState === 'active') {
                this.facilityState = 'inactive';
            } else {
                this.facilityState = 'active';
            }
        }
    }

    /**
     * 开始拖拽
     * @param ev
     */
    dragstart(ev): void {
        console.log('dragstart');
    }

    /**
     * 拖拽到目标元素  松开鼠标
     * @param ev
     */
    drop(ev): void {
        let node = new this.Q.Node();
        let p = this.graph.globalToLocal(ev);
        let l = this.graph.toLogical(p.x, p.y);
        node.size = {width: 200, height: parseInt(this.image.split('-')[2].split('.')[0]) * LH};
        node.x = 0;
        node.y = Util.amendCoordinate(l.y, node.size.height, LH, LN);
        node.image = this.image + '';
        this.graph.graphModel.add(node);
        Util.warning(this.graph, node);
    }

    /**
     * 拖拽结束
     * @param ev
     */
    dragover(ev): void {
        console.log('dragover');
    }

    /**
     * 选择服务器图片
     * @param image
     */
    checkedImage(image) {
        this.image = image;
        this.height = parseInt(this.image.split('-')[2].split('.')[0]) * LH;
    }

    private mock(): Servicer {
        let servicer = new Servicer();
        servicer.id = 'id_' + Util.getRandomColor();
        servicer.name = '服务器_' + Util.getRandomColor();
        for (let i = 0; i < 3; i++) {
            let st = new ServerType();
            st.id = 'id_' + Util.getRandomColor();
            st.name = '型号_' + Util.getRandomColor();
            st.hasChildType = true;
            for (let i = 0; i < 4; i++) {
                let _st = new ServerType();
                _st.id = 'id_' + Util.getRandomColor();
                _st.name = 'name_' + Util.getRandomColor();
                let _random = Math.round(Math.random() * 3) % 3;
                _st.image = _random === 0 ? IMAGE.A : _random === 1 ? IMAGE.B : IMAGE.C;
                st.addChildren(_st);
            }
            servicer.addChildren(st);
        }
        return servicer;
    }

}

/**
 * 工具类
 */
class Util {
    /**
     * 设置告警显示信息
     * @param graph
     * @param target
     * @param {number} rank
     */
    public static warning(graph, target, rank: number = 0): void {
        let _y = target.y - target.size.height / 2;
        let node = graph.createNode('', 110, _y);
        node.image = 'warning';
        node.size = {
            width: 18,
            height: 18
        };
        node.tooltip = `
            <p>告警名称：No213123 </p>
            <p>告警等级：A+ </p>
            <p>告警编号：879234 </p>
            <p>告警时间：2017-3-6 </p>
        `;
        console.dir(node);
        node.set('type', 'warn');
        node.host = target;
        target.host = node;

    }

    /**
     * 修正图例坐标位置
     * @param {number} y
     * @param {number} itemLh
     * @param {number} lh
     * @param {number} ln
     * @returns {number}
     */
    public static amendCoordinate(y: number, itemLh: number, lh: number = 17, ln: number = 42): number {
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

    /**
     * 修正告警图示位置
     * @param target
     * @param item
     */
    public static amendWarning(target, item): void {
        item.x = 110;
        item.y = target.y - target.size.height / 2;
    }

    /**
     * 获取随机颜色
     * @returns {string}
     */
    public static getRandomColor(): string {
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
