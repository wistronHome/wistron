import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {
    Router,
    ActivatedRoute,
    Params,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    ParamMap
} from '@angular/router';
import 'rxjs/add/operator/switchMap';
// import { HttpClient } from '@angular/common/http';
import { fadeLeftIn } from "../../animations/fade-left-in"
import { Servicer, ServerType, Facility } from "../../models/index";
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CabinetService } from "./cabinet.service";
import { AmendUtil } from "./amend-util";
import { LegendUtil } from "./legend-util";
import * as TYPES from './types';

const LH: number = 17;
const LN: number = 32;
const IMAGE = {
    A: './assets/image/cabinet-a-1.png',
    B: './assets/image/griff-200-10.png',
    C: './assets/image/cabinet-c-3.png',
    D: './assets/image/server-22-4.png',
    E: './assets/image/griff-200-4.png'
};


@Component({
    selector: 'app-cabinet',
    templateUrl: './cabinet.component.html',
    styleUrls: ['./cabinet.component.scss'],
    animations: [ fadeLeftIn ],
    providers: [ CabinetService ]
})

export class CabinetComponent implements OnInit, OnChanges {
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
    image: string = null;
    width: number = 240;
    height: number = LH;
    currentId :number;
    constructor(
        private router: Router,
        private routeInfo: ActivatedRoute,
        private $message: NzMessageService,
        private $modal: NzModalService,
        private $service: CabinetService
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        console.log('onChanges');
    }
    ngOnInit() {
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
        this.graph.isSelectable = ev => {
            if (ev.get('selected') && ev.get('selected') === 'unselected') {
                return false;
            }
            return true;
        };
        this.graph.isMovable = ev => {
            return !ev.get('isBind');
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
            if (evt.getData() && evt.getData().get('isBind')) {
                return;
            }
            if (evt.getData() && !evt.getData().get('selected')) {
                let type = evt.getData().get('type');
                let currentY = AmendUtil.amendCoordinate(evt.getData().y, evt.getData().size.height);
                let offsetY = evt.getData().y - currentY;
                if (type !== TYPES.SERVER) {
                    evt.getData().x = 0;
                    evt.getData().y = currentY;
                    if (AmendUtil.verifyOverlay(evt.getData())) {
                        offsetY += evt.getData().y - _y;
                        evt.getData().y = _y;
                        this.$message.create('error', '拖拽后位置会与其他图元发生重叠，请重新操作~');
                    }
                }

                // AmendUtil.amendWarning(evt.getData(), evt.getData().host);
                if (type === TYPES.GRIFF) {
                    AmendUtil.amendChildren(evt.getData(), offsetY);
                } else if (type === TYPES.SERVER) {
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
                let { x, y, image } = evt.getData();
                let facility = { x, y, image };
                facility['width'] = evt.getData().size.width;
                facility['height'] = evt.getData().size.height;
                facility['type'] = evt.getData().get('type');
                facility['index'] = evt.getData().get('index') || '--';
                facility['isBind'] = evt.getData().get('isBind') || '--';

                this.menuData = [];
                for (let key of Object.keys(facility)) {
                    this.menuData.push({
                        key: key,
                        name: facility[key]
                    });
                }
                // 记录下点击图元的id
                this.currentId = evt.getData()['id'];
            } else {
                let facility = new Facility();
                this.menuData = [];
                for (let key of Object.keys(facility)) {
                    this.menuData.push({
                        key: key,
                        name: facility[key]
                    });
                }
            }
        };
        // this.graph.originAtCenter = false;
        this.routeInfo.params.subscribe((params: Params) => {
            this.legendUtil.drawCabinetBg(LH, LN);
            this.legendUtil.drawCabinet(this.$service.getAllNode());
        });
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
    /*点击删除当前图元*/
     delServer(): void {
        this.graph.graphModel['removeById'](this.currentId);
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
            type = types[types.length - 1].split('-')[0].toUpperCase();
        let row = Math.floor(parseInt(this.image.split('-')[2].split('.')[0]) / 4);

        switch (type) {
            case TYPES.CABINET:
                this.legendUtil.drawNode(this.image, ev);
                break;
            case TYPES.GRIFF:
                this.legendUtil.drawGriff(this.image, ev, this.$service.getGriff(11, 22, 4, row));
                break;
            case TYPES.SERVER:
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
                let _random = Math.round(Math.random() * 4) % 4;
                _st.image = _random === 0 ? IMAGE.D : _random === 1 ? IMAGE.B : _random === 2 ? IMAGE.C : IMAGE.E;
                st.addChildren(_st);
            }
            servicer.addChildren(st);
        }
        return servicer;
    }

}

