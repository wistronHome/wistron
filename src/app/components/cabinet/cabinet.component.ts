import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { fadeLeftIn } from "../animations/fade-left-in"
import { Servicer, ServerType, Facility } from "../models/Models";
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

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
    image: string = IMAGE.A;
    height: number = LH;
    facility = null;
    constructor(
        // private http: HttpClient,
        private router: Router,
        private aRouter: ActivatedRoute,
        private $message: NzMessageService,
        private $modal: NzModalService
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
        /**
         * 配置Qunee
         */
        this.graph.enableTooltip = true;
        this.graph.tooltipDelay = 0;
        this.graph.tooltipDuration = 10000;
        this.Q.registerImage('warn', '../../../assets/svg/warning.svg');

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
        // 记录图例初始位置，用于操作无效时回滚。
        let _y: number = 0;
        /**
         * 拖拽事件开始时触发
         * @param ev
         */
        this.graph.startdrag = ev => {
            let _item = ev.getData();
            if (_item && _item.get('type') && _item.get('type') === 'node')
            _y = _item.y;
        };
        /**
         * 拖拽图元
         * @param evt
         */
        this.graph.enddrag = evt => {
            if (evt.getData() && !evt.getData().get('selected')) {
                evt.getData().x = 0;
                evt.getData().y = Util.amendCoordinate(evt.getData().y, evt.getData().size.height);
                if (Util.verifyOverlay(this.graph, evt.getData())) {
                    evt.getData().y = _y;
                    this.$message.create('error', '拖拽后位置会与其他图元发生重叠，请重新操作~');
                }
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
            if (evt.getData() && !evt.getData().get('selected')) {
                this.facilityState = 'active';
                // let {id, name, image, size} = evt.getData();
                // this.facility = {id, name, image, size};
            } else {
                // this.facility = null;
            }
        };
        // this.graph.originAtCenter = false;
        Util.drawCabietBg(this.Q, this.graph, LH, LN);
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
        var p = this.graph.globalToLocal(ev);
        var l = this.graph.toLogical(p.x, p.y);
        node.size = {width: 200, height: parseInt(this.image.split('-')[2].split('.')[0]) * LH};
        node.x = 0;
        node.y = Util.amendCoordinate(l.y, node.size.height, LH, LN);
        node.image = this.image + '';
        node.set('type', 'node');
        if (!Util.verifyOverlay(this.graph, node)) {
            this.graph.graphModel.add(node);
            Util.createWarning(this.graph, node);
        } else {
            this.$message.create('error', '拖拽后位置会与其他图元发生重叠，请重新操作~');
        }
    }

    /**
     * 拖拽结束
     * @param ev
     */
    dragover(ev): void {
        console.log('dragover');
    }

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

class Util {

    /**
     * 绘制机柜背景
     * @param Q
     * @param graph
     * @param {number} LH
     * @param {number} LN
     */
    public static drawCabietBg(Q, graph, LH: number, LN: number) {
        let node = graph.createNode('', 0, 0);
        node.set('selected', 'unselected');
        node.image = '../../../assets/image/cabinet.png';
        node.setStyle(Q.Styles.HEIGHT, 30);
        graph.graphModel.add(node);
        for (let i = 0; i <= LN; i++) {
            let line = graph.createShapeNode();
            line.setStyle(Q.Styles.SHAPE_STROKE_STYLE, '#999');
            line.setStyle(Q.Styles.SHAPE_LINE_DASH, [2, 2]);
            line.set('selected', 'unselected');
            line.set('type', 'bgLine');
            line.moveTo(-100, -LH * LN / 2 + i * LH);
            line.lineTo(100, -LH * LN / 2 + i * LH);
            graph.graphModel.add(line);
        }
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

    /**
     * 图例坐标修正
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
      * 设置告警显示信息
      * @param graph
      * @param target
      * @param {number} rank
      */
    public static createWarning(graph, target, rank: number = 0): void {
        let _y = target.y - target.size.height / 2;
        let node = graph.createNode('', 110, _y);
        node.image = 'warn';
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
        node.set('type', 'warn');
        node.host = target;
        target.host = node;
    }

    /**
     * 告警图示位置修正
     * @param target
     * @param item
     */
    public static amendWarning(target, item): void {
        item.x = 110;
        item.y = target.y - target.size.height / 2;
    }

    /**
     * 校验图例所占位置是否会与其他图例重叠
     * @param graph
     * @param target
     * @returns {boolean}
     */
    public static verifyOverlay(graph, target): boolean {
        let min = (target.y - target.size.height / 2) / 17,
            max = (target.y + target.size.height / 2) / 17,
            isOverlay = false;
        graph.graphModel.forEach(item => {
            if (item.get('type') && item.get('type') === 'node') {
                if (item.id !== target.id) {
                    let _min = (item.y - item.size.height / 2) / 17,
                        _max = (item.y + item.size.height / 2) / 17;
                    /**
                     * 目标图例的上下边在其他图例内部 或者目标图例将其他图例包裹在自己内部
                     */
                    if (min > _min && min < _max || (max > _min && max < _max) || (min <= _min && max >= _max)) {
                        isOverlay = true;
                        return false;
                    }
                }
            }
        });
        return isOverlay;
    }
}
