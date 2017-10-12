import { AmendUtil } from "./amend-util";
import { NzMessageService } from 'ng-zorro-antd';

export class LegendUtil {
    readonly Q: any;
    readonly graph: any;
    constructor(
        Q: any,
        graph: any,
        private $message: NzMessageService
    ) {
        this.Q = Q;
        this.graph = graph;
    }

    /**
     * 绘制机柜背景
     * @param Q
     * @param graph
     * @param {number} LH
     * @param {number} LN
     */
    public drawCabinetBg(LH: number, LN: number): void {
        let node = this.graph.createNode('', 0, 0);
        node.set('type', 'CABINET_BG');
        node.set('selected', 'unselected');
        node.image = '../../../assets/image/cabinet.png';
        node.setStyle(this.Q.Styles.HEIGHT, 30);
        this.graph.graphModel.add(node);
        for (let i = 0; i <= LN; i++) {
            let line = this.graph.createShapeNode();
            line.setStyle(this.Q.Styles.SHAPE_STROKE_STYLE, '#999');
            line.setStyle(this.Q.Styles.SHAPE_LINE_DASH, [2, 2]);
            line.set('selected', 'unselected');
            line.set('type', 'bgLine');
            line.moveTo(-100, -LH * LN / 2 + i * LH);
            line.lineTo(100, -LH * LN / 2 + i * LH);
        }
    }

    /**
     * 绘制刀箱
     * @param griffData
     */
    public drawGriff(image, ev, griffData, LH: number = 17) {
        let griff = new this.Q.Node();
        let p = this.graph.globalToLocal(ev);
        let l = this.graph.toLogical(p.x, p.y);
        griff.set('type', 'griff');
        griff.set('griff', griffData);
        griff.size = {
            width: 200,
            height: parseInt(image.split('-')[2].split('.')[0]) * LH
        };
        griff.x = 0;
        griff.y = AmendUtil.amendCoordinate(l.y, griff.size.height, LH, 42);
        griff.image = image;
        if (!AmendUtil.verifyOverlay(griff)) {
            this.graph.graphModel.add(griff);
            this.drawGriffSlot(griff, griffData);
        } else {
            this.$message.error('该位置已有设备~');
        }
    }

    /**
     * 绘制普通设备节点
     * @param {string} image
     * @param ev
     * @param {number} LH
     */
    public drawNode(image: string, ev, LH: number = 17) {
        let node = new this.Q.Node();
        let p = this.graph.globalToLocal(ev);
        let l = this.graph.toLogical(p.x, p.y);
        node.set('type', 'node');
        node.size = {
            width: 200,
            height: parseInt(image.split('-')[2].split('.')[0]) * LH
        };
        node.x = 0;
        node.y = AmendUtil.amendCoordinate(l.y, node.size.height, LH, 42);
        node.image = image;
        if (!AmendUtil.verifyOverlay(node)) {
            this.graph.graphModel.add(node);
        } else {
            this.$message.error('该位置已有设备~');
        }
    }

    /**
     * 绘制刀片服务器
     * @param {string} image
     * @param ev
     * @param {number} LH
     */
    public drawServer(image: string, ev, LH:number = 17) {
        let server = new this.Q.Node();
        let p = this.graph.globalToLocal(ev);
        let l = this.graph.toLogical(p.x, p.y);
        server.set('type', 'server');
        server.size = {
            width: parseInt(image.split('-')[1]),
            height: parseInt(image.split('-')[2].split('.')[0]) * LH
        };
        server.x = l.x;
        server.y = AmendUtil.amendCoordinate(l.y, server.size.height, LH, 42);
        server.image = image;
        server.zIndex = 99;
        let griff = AmendUtil.verifyServerOverlay(server);
        if (griff) {
            server.host = griff;
            server.parent = griff;
            AmendUtil.amendServer(griff, server);
            this.graph.graphModel.add(server);
        } else {
            this.$message.error('刀片服务器必须放置在刀箱中~');
        }
    }
    /**
     * 绘制刀箱内卡槽位置
     * @param target
     * @param {Object[]} data
     */
    private drawGriffSlot(target, data) {
        let _x: number = target.x - target.size.width / 2,
            _y: number = target.y - target.size.height / 2;
        data.forEach((item, index) => {
            let line = this.graph.createShapeNode();
            // line.setStyle(this.Q.Styles.SHAPE_STROKE_STYLE, 'red');
            // line.setStyle(this.Q.Styles.SHAPE_LINE_DASH, [2, 2]);
            line.set('selected', 'unselected');
            line.set('type', 'griffLine');
            line.moveTo(_x + item['x'], _y + item['y']);
            line.lineTo(_x + item['x'] + item['w'], _y + item['y']);
            line.lineTo(_x + item['x'] + item['w'], _y + item['y'] + item['h']);
            line.lineTo(_x + item['x'], _y + item['y'] + item['h']);
            line.lineTo(_x + item['x'], _y + item['y']);
            line.set('index', index);
            line.zIndex = 98;
            line.host = target;
            line.parent = target;
        });
    }
}
