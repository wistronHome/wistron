import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { fadeLeftIn } from "../animations/fade-left-in"
import { Servicer, ServerType, Facility } from "../models/Models";
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CabinetService } from "./cabinet.service";
import { AmendUtil } from "./amend-util";
import { LegendUtil } from "./legend-util";

const LH: number = 17;
const LN: number = 42;
const IMAGE = {
    A: './assets/image/cabinet-a-1.png',
    B: './assets/image/griff-200-4.png',
    C: './assets/image/cabinet-c-3.png',
    D: './assets/image/server-20-4.png'
};
const TYPES = {
    CABINET_BG: 'CABINET_BG'
};

@Component({
    selector: 'app-cabinet',
    templateUrl: './cabinet.component.html',
    styleUrls: ['./cabinet.component.scss'],
    animations: [ fadeLeftIn ],
    providers: [ CabinetService ]
})

export class CabinetComponent implements OnInit {
    private legendUtil: LegendUtil;
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
    image: string = IMAGE.B;
    width: number = 240;
    height: number = LH;
    facility = null;
    constructor(
        // private http: HttpClient,
        private router: Router,
        private aRouter: ActivatedRoute,
        private $message: NzMessageService,
        private $modal: NzModalService,
        private $service: CabinetService
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
        }, 3000);

        this.graph = new this.Q.Graph('canvas');
        this.legendUtil = new LegendUtil(this.Q, this.graph, this.$message);
        AmendUtil.init(this.Q, this.graph, this.$message);
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
        let _x: number = 0,
            _y: number = 0;
        /**
         * 拖拽事件开始时触发
         * @param ev
         */
        this.graph.startdrag = ev => {
            let _item = ev.getData();
            if (_item && _item.get('type')) {
                _x = _item.x;
                _y = _item.y;
            }
        };
        /**
         * 拖拽图元
         * @param evt
         */
        this.graph.enddrag = evt => {
            if (evt.getData() && !evt.getData().get('selected')) {
                let type = evt.getData().get('type');
                let currentY = AmendUtil.amendCoordinate(evt.getData().y, evt.getData().size.height);
                let offsetY = evt.getData().y - currentY;
                if (type !== 'server') {
                    evt.getData().x = 0;
                    evt.getData().y = currentY;
                    if (AmendUtil.verifyOverlay(evt.getData())) {
                        evt.getData().y = _y;
                        this.$message.create('error', '拖拽后位置会与其他图元发生重叠，请重新操作~');
                    }
                }

                // AmendUtil.amendWarning(evt.getData(), evt.getData().host);
                if (type === 'griff') {
                    AmendUtil.amendChildren(evt.getData(), offsetY);
                } else if (type === 'server') {
                    AmendUtil.dragServer(evt, { x: _x, y: _y });
                }

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
        this.legendUtil.drawCabinetBg(LH, LN);
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
        let types = this.image.split('/'),
            type = types[types.length - 1].split('-')[0];
        switch (type) {
            case 'cabinet':
                this.legendUtil.drawNode(this.image, ev);
                break;
            case 'griff':
                this.legendUtil.drawGriff(this.image, ev, this.$service.getGriff())
                break;
            case 'server':
                this.legendUtil.drawServer(this.image, ev);
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
        let types = this.image.split('/'),
            type = types[types.length - 1].split('-')[0];
        if (type === 'server') {
            this.width = 20;
        } else {
            this.width = 240;
        }
        this.height = parseInt(this.image.split('-')[2].split('.')[0]) * LH;
    }


    private mock(): Servicer {
        let servicer = new Servicer();
        servicer.id = 'id_' + AmendUtil.getRandomColor();
        servicer.name = '服务器_' + AmendUtil.getRandomColor();
        for (let i = 0; i < 3; i++) {
            let st = new ServerType();
            st.id = 'id_' + AmendUtil.getRandomColor();
            st.name = '型号_' + AmendUtil.getRandomColor();
            st.hasChildType = true;
            for (let i = 0; i < 4; i++) {
                let _st = new ServerType();
                _st.id = 'id_' + AmendUtil.getRandomColor();
                _st.name = 'name_' + AmendUtil.getRandomColor();
                let _random = Math.round(Math.random() * 3) % 3;
                _st.image = _random === 0 ? IMAGE.D : _random === 1 ? IMAGE.B : IMAGE.C;
                st.addChildren(_st);
            }
            servicer.addChildren(st);
        }
        return servicer;
    }

}

