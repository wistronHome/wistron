import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgModel} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';
import {RoomSerService} from "./room-ser.service";

@Component({
    selector: 'app-room',
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.scss'],
    animations: [
        trigger('attributeState', [
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
    ],
    providers: [RoomSerService]
})
export class RoomComponent implements OnInit {
    room: any = '';
    state: string = 'active';
    state1: string = 'inactive';
    Q = window['Q'];
    graph = null;
    model = '';
    id = '';
    name = '';
    ChildId = '';
    restX = null;
    restY = null;
    roomId = null;
    _roomWidth: number = 0;
    _roomHeight: number = 0;
    info = null;
    isCustomCabinet = false; // 自定义机柜显示修改宽高选项
    width = ''; // 自定义机柜的宽
    height = ''; // 自定义机柜的高
    Unumber = ''; // 自定义机柜的u数
    constructor(private router: Router,
                private routerInfo: ActivatedRoute,
                private RoomSerService: RoomSerService,
                private http: HttpClient) {
    }

    ngOnInit() {

        this.roomId = this.routerInfo.params.subscribe((params) => {
            this.roomId = params['id'];
            console.log(this.roomId);
        });
        this.roomId = this.routerInfo.snapshot.params['id'];
        // 获取room数据详情
        this.room = this.RoomSerService.getRoomInfo(this.roomId);
        this.graph = new this.Q.Graph('mcRoom');
        // 设置坐标原点
        this.graph.originAtCenter = false;
        // 机房宽12米 高12米 比例1米=100px 方格为10px*10px 20cm*20cm 的正方形 1px= 2cm;
        const roomWidth = 600, // px
            roomHeight = 600; // px
        tools.drawRoom(this.Q, this.graph, roomWidth, roomHeight);
        // 设置是否能被选择
        this.graph.isSelectable = (item) => {
            // console.log(item.agentNode.type);
            return item.agentNode.type === 'Q.Node';
        };
        this.graph.isMovable = (e) => {
            return !e.get('isLock');
        }
        // 鼠标按下之后记录按下的信息
        var src, startX, startY, _width, _height, _type;
        document.getElementById('tools').ondragstart = (e) => {
            console.log(e.target['getAttribute']('_width'));
            _width = e.target['getAttribute']('_width');
            _height = e.target['getAttribute']('_height');
            _type = e.target['getAttribute']('_type');
            src = e.target['src'] && e.target['src'].includes('svg') ? e.target['src'].split("/")[5] : 'aaaa';
            startX = e.offsetX;
            startY = e.offsetY;
        }
        document.getElementById('mcRoom').ondrop = (e) => {
            // 位置的矫正 还没有做警示图标的矫正
            console.log(e);
            if (tools.checkOverLap(this.model, e, {'_width': _width, '_height': _height})) {
                alert('目标重合请重试');
                return;
            }
            const x = tools.correctLocation(e.offsetX, _width);
            let y = tools.correctLocation(e.offsetY, _height);
            var p = this.graph.toLogical(x, y);
            // var computer = this.graph.createNode('', p.x, p.y);
            // // var computer = this.graph.createText('', p.x, p.y);
            // let image = 'assets/room/' + src;
            // image='assets/room/mx-cabinet4white.svg'
            // computer.image = image;
            // computer.name = '007'
            // computer.set('type','cabinet')
            // computer.size = {width: _width, height: _height};
            // computer.setStyle(this.Q.Styles.LABEL_OFFSET_Y, -_height/2)
            // computer.setStyle(this.Q.Styles.BORDER, 1);
            // computer.setStyle(this.Q.Styles.BORDER_RADIUS,0)
            // computer.setStyle(this.Q.Styles.BACKGROUND_COLOR,'#2898E0')
            // // let size = new this.Q.Size (+_width,+_height )
            // // computer.setStyle(this.Q.Styles.LABEL_SIZE, size)
            // var alarmUI = this.graph.createNode('', p.x + 30, p.y - 30);
            // alarmUI.image = 'assets/room/alarmred.svg';
            // alarmUI.set('type','alarm')
            // alarmUI.size = {width: 30};
            // alarmUI.zIndex = 999;
            // alarmUI.host = computer;
            // alarmUI.parent = computer;
            if (_type === 'roomWall') {
                tools.drawRoomWall(this.Q, this.graph, p.x, p.y);
                return;
            }
            ;
            if (_type === 'customCabinet') {
                tools.drawCustomCabinet(this.Q, this.graph, p.x, p.y);
                return;
            }
            tools.drawCabinet(this.Q, this.graph, '007', p.x, p.y, _width, _height, 0);
        };


        var model = this.graph.graphModel;
        this.model = model;
        // 假数据的渲染
        // let info = [{name: "jjj", id: 429, x: 100, y: 150, w: 60,h:40,img:"assets/room/mx-cabinet4red.svg"},
        // {name: "ppp", id: 430, x: 100, y: 190, w: 60,h:40, img:"assets/room/mx-cabinet4red.svg"},
        // {name: "ppp", id: 431, x: 100, y: 230, w: 60,h:40, img:"assets/room/mx-cabinet4.svg"},
        // {name: "ppp", id: 4331, x: 100, y: 270, w: 60, h:40,img:"assets/room/mx-cabinet4.svg"},
        // {name: "42U", id: 432, x: 100, y: 310, w: 60, h:40,img:"assets/room/mx-cabinet4.svg"},
        // {name: "42U023", id: 433, x: 230, y: 145, w: 60, h:30, img:"assets/room/mx1red.svg"},
        // {name: "007", id: 71, x: 230, y: 175, w: 60, h:30,img:"assets/room/mx-cabinet4red.svg"},
        // {name: "", id: 711, x: 5, y: 302.5, w: 10, h:594,img:"assets/room/mx-cabinet2.svg",type:'roomWall'},
        // {name: "", id: 1038, x: 307, y:595, w: 627, h:13,img:"assets/room/mx-cabinet2.svg",type:'roomWall'}
        // ]
        let info = this.RoomSerService.getCabinetInfo();
        console.log(info);
        for (var i = 0; i < info.length; i++) {
            // var demo = this.graph.createNode(info[i].name, info[i].x, info[i].y);
            // demo.image = info[i].img
            // demo.size = {width: info[i].w,height: info[i].h};
            // demo.setStyle(this.Q.Styles.LABEL_OFFSET_Y, -info[i].h/2)
            // demo.setStyle(this.Q.Styles.BORDER, 1);
            // demo.setStyle(this.Q.Styles.BORDER_RADIUS,0)
            // let alarmUI = this.graph.createNode('', info[i].x + 30, info[i].y - 30);
            // alarmUI.image = 'assets/room/alarmred.svg';
            // alarmUI.size = {width: 30};
            // alarmUI.zIndex = 999;
            // alarmUI.host = demo;
            // alarmUI.parent = demo;
            if (info[i]['type']) {
                let demo = this.graph.createNode(info[i].name, info[i].x, info[i].y);
                demo.set('type', info[i]['type']);
                demo.image = info[i].img;
                demo.size = {width: info[i].w, height: info[i].h};
            } else {
                tools.drawCabinet(this.Q, this.graph, info[i].name, info[i].x, info[i].y, info[i].w, info[i].h, info[i].img);
            }
        }
        //点击机房
        this.graph.onclick = e => {
            if (e.getData() && e.getData().get('type') === 'cabinet' || e.getData() && e.getData().get('type') !== 'roomWall') {
                this.id = e.getData().id;
                this.name = e.getData().name;
                //子图元的id
                if (e.getData().data) {
                    this.ChildId = e.getData().data.children.datas[0].id;
                }
                this.state = 'active';
                this.graph.editable = false;
                // 点到自定义机柜之后显示宽高设置
                if (e.getData().get('type') === 'customCabinet') {
                    console.log(e);
                    this.isCustomCabinet = true;
                    this.width = e.getData().size.width;
                    this.height = e.getData().size.height;
                } else {
                    this.isCustomCabinet = false;
                }
            } else if (e.getData() && e.getData().get('type') === 'roomWall') {
                this.id = e.getData().id;
                this.graph.editable = true;
            } else {
                this.graph.editable = false;
            }
        };
        // 右键改名字
        /**
         * 双击进入机柜页面
         */
        this.graph.ondblclick = e => {
            if (e.getData() && e.getData().type === 'Q.Node' && e.getData().get('type') === 'cabinet') {
                this.router.navigate(['machine/cabinet/' + e.getData().id]);
            }
        }
        // 图元的拖拽位置吸附
        this.graph.startdrag = e => {
            // 记录下位置让目标退回到原来的位置
            if (e.getData() && e.getData().type !== 'Q.ShapeNode') {
                this.restX = e.getData().x;
                this.restY = e.getData().y;
            }

        }
        this.graph.enddrag = e => {
            if (e.getData() && e.getData().type !== 'Q.ShapeNode' && !e.getData().get('isLock')) {
                if (tools.checkOverLap(this.model, e, null)) {
                    e.getData().x = this.restX;
                    e.getData().y = this.restY;
                    // 如果有告警图标
                    if (e.getData().childrenCount !== 0) {
                        e.getData().children.datas[0].x = e.getData().x + 30;
                        e.getData().children.datas[0].y = e.getData().y - 30;
                    }
                    alert('目标重合了 请重试');
                } else {
                    e.getData().x = tools.correctLocation(e.getData().x, e.getData().size.width);
                    e.getData().y = tools.correctLocation(e.getData().y, e.getData().size.height);
                    // 设置告警图标的位置
                    if (e.getData().childrenCount !== 0) {
                        e.getData().children.datas[0].x = e.getData().x + 30;
                        e.getData().children.datas[0].y = e.getData().y - 30;
                    }
                }

            }
        };
    }

    delCabinet(): void {
        this.model['removeById'](this.id);
        this.model['removeById'](this.ChildId);
    }

    lockCabinet(): void {
        this.model['forEach'](e => {
            if (e.id == this.id) {
                e.set('isLock', true);
            }
        });
    }

    unLockCabinet(): void {
        this.model['forEach'](e => {
            if (e.id === this.id) {
                e.set('isLock', false);
            }
        });
    }

    editCabinet(): void {
        this.model['forEach'](e => {
            if (e.id === this.id) {
                e.name = this.name;
                if (e.get('type') === 'customCabinet') {
                    e.size = {width: this.width, height: this.height};
                }
            }
        });
    }

    toggle(): void {
        if (this.state === 'active') {
            this.state = 'inactive';
            // this.state1 = 'active';
        } else {
            this.state = 'active';
            this.state1 = 'inactive';
        }
    }

    toolsToggle(): void {

    }

    // 弹框修改机房大小
    iisVisible = false;
    isVisible = false;
    isConfirmLoading = false;
    roomWidth = null;
    roomHeight = null;

    // 点击弹出修改机柜的模态框（备用）
    showCabinetModal() {
        this.iisVisible = true;
    }

    handleOkcabinet() {
        this.iisVisible = false;
    }

    hiddenCabinet() {
        this.iisVisible = false;
    }

    showModal = () => {
        this.isVisible = true;
    }
    handleOk = (e) => {
        this.isConfirmLoading = true;
        console.log(this._roomHeight);
        console.log(this._roomWidth);
        this.graph.clear();
        setTimeout(() => {
            this.isVisible = false;
            this.isConfirmLoading = false;
            tools.drawRoom(this.Q, this.graph, this._roomWidth * 50, this._roomHeight * 50);
            for (var i = 0; i < this.info.length; i++) {
                tools.drawCabinet(this.Q, this.graph, this.info[i].name, this.info[i].x, this.info[i].y, this.info[i].w, this.info[i].h, this.info[i].img)
            }
        }, 2000);

    }

    handleCancel = (e) => {
        this.isVisible = false;
    }
    /**
     * 保存机房信息
     */
    roomSave = () => {
        let arr = [];
        this.model['forEach']((item) => {
            if (item.get('type') === 'cabinet' || item.get('type') === 'roomWall') {
                console.log(item);
                var element = {
                    cabinetId: 1,
                    cabinetName: "",
                    cabinetMaxU: 32,
                    usedU: "",
                    cabinetHeight: "",
                    cabinetWidth: "",
                    cabinetImage: "",
                    cabinetType: "",
                    cabinetX: 200,
                    cabinetY: 290,
                    cabinetRemark: "",
                    roomId: 2
                }
                element.cabinetId = item.id;
                element.cabinetName = item.name;
                element.cabinetHeight = item.size.height;
                element.cabinetWidth = item.size.width;
                element.cabinetImage = item.image;
                element.cabinetX = item.x;
                element.cabinetY = item.y;
                element.roomId = this.roomId;
                // if (item.childrenCount === 1) {
                //     element.cabinetType = item.children.datas[0];
                // }else {
                //     element.cabinetType = null;
                // }
                arr.push(element);
            }
        });
        // this.info = arr;
        console.log(arr);
        let obj = {};
        obj['roomId'] = this.roomId;
        obj['cabinetSet'] = arr;
        console.log(obj);
        this.RoomSerService.saveRoomInfo(obj);

    };

    /*获取机房详情*/
    getRoomsDetail() {
        this.http.get('/itm/rooms').subscribe(data => {
            this.info = data;
        });
    }
}

class tools {
    /**
     * 判断机柜之间是否都重叠
     * @param model
     * @param e
     * @param obj
     * @returns {boolean}
     */
    public static checkOverLap(model, e, obj): boolean {
        if (e.getData) {
            var _minx = e.getData().x - e.getData().size.width / 2,
                _maxx = e.getData().x + e.getData().size.width / 2,
                _miny = e.getData().y - e.getData().size.height / 2,
                _maxy = e.getData().y + e.getData().size.height / 2,
                isOverLap = false;
        } else {
            // 拖拽过来之后的大小
            let width = obj._width, height = obj._height;
            _minx = e.offsetX - width / 2,
                _maxx = e.offsetX + width / 2,
                _miny = e.offsetY - height / 2,
                _maxy = e.offsetY + height / 2,
                isOverLap = false;
        }
        model['forEach'](item => {
            if (!item.size || item.type === 'Q.ShapeNode' || item.host || item.get('type') === 'alarm') {
                return;
            } else if (item.get('type') === 'cabinet' || item.get('type') === 'customCabinet') {
                let minx = item.x - item.size.width / 2,
                    maxx = item.x + item.size.width / 2,
                    miny = item.y - item.size.height / 2,
                    maxy = item.y + item.size.height / 2;
                if (
                    ((_minx > minx && _minx < maxx && _maxx > maxx) && (_miny > miny && _miny < maxy && _maxy > maxy || _miny == miny))
                    || ((_minx > minx && _minx < maxx && _maxx > maxx || _minx == minx) && (_maxy > miny && _maxy < maxy) && _miny < miny)
                    || ((_maxx > minx && _maxx < maxx && _minx < minx) && ((_maxy > miny && _maxy < maxy) && _miny < miny))
                    || ((_maxx > minx && _maxx < maxx && _minx < minx) && (_miny > miny && _miny < maxy && _maxy > maxy))

                ) {
                    isOverLap = true;
                    return;
                }
            }
        })
        return isOverLap;
    }

    /**
     * 调整位置自动贴边
     * @param number
     * @param size
     * @returns {number}
     */
    public static correctLocation(number, size): number {
        let newNumber = number % 10 > 5 ? Math.ceil(number / 10) * 10 : Math.floor(number / 10) * 10;
        if (+size % 4 == 0) {
            return newNumber;
        } else if (+size % 4 != 0) {
            console.log('单数');
            return newNumber + 5;
        }

    }

    /**
     * 绘制机房
     * @param Q
     * @param graph
     * @param roomWidth
     * @param roomHeight
     */
    public static drawRoom(Q, graph, roomWidth, roomHeight): void {
        // 绘制横线 比例1米=100px 方格为10px*10px 20cm*20cm 的正方形 1px= 2cm;
        var roomWidth = roomWidth, roomHeight = roomHeight;
        // 对多的数据进行取整
        // roomWidth = roomWidth % 30 == 0 ? roomWidth : Math.floor(roomWidth / 30) * 20;
        // roomHeight = roomHeight % 30 == 0 ? roomHeight : Math.floor(roomHeight / 30) * 20;
        var rowNumber = roomHeight / 10;
        for (var i = 0; i < rowNumber + 1; i++) {
            var row = graph.createShapeNode();
            var height = i * 10;
            row.moveTo(0, height);
            row.lineTo(roomWidth, height);
            row.setStyle(Q.Styles.SHAPE_STROKE_STYLE, '#959393');
            row.setStyle(Q.Styles.SHAPE_STROKE, 0.5);
            row.setStyle(Q.Styles.SHAPE_LINE_DASH, [5, 2]);
            row.isSelected = function () {
                return false;
            };
            row.isMovable = function () {
                return false;
            };
            if (i % 3 === 0) {
                row.setStyle(Q.Styles.SHAPE_LINE_DASH, [5, 0]);
            }
        }
        // 绘制竖线
        var lineNumber = roomWidth / 10;
        for (var i = 0; i < lineNumber + 1; i++) {
            var line = graph.createShapeNode();
            var width = i * 10;
            line.moveTo(width, 0);
            line.lineTo(width, roomHeight);
            line.setStyle(Q.Styles.SHAPE_STROKE_STYLE, '#aaa9a9');
            line.setStyle(Q.Styles.SHAPE_LINE_DASH, [5, 2]);
            if (i % 3 == 0) {
                line.setStyle(Q.Styles.SHAPE_LINE_DASH, [5, 0]);

            }
        }
    }

    /**
     * 绘制机柜
     * @param Q
     * @param graph
     * @param x
     * @param y
     * @param w
     * @param h
     * @param name
     * @param image
     */
    public static drawCabinet(Q, graph, name, x, y, w, h, image): void {
        let demo = graph.createNode(name, x, y);
        demo.image = image || 'assets/room/mx-cabinet4white.svg';
        demo.size = {width: w, height: h};
        demo.set('type', 'cabinet');
        demo.setStyle(Q.Styles.LABEL_OFFSET_Y, -h / 2);
        demo.setStyle(Q.Styles.BORDER, 1);
        demo.setStyle(Q.Styles.BORDER_RADIUS, 0);
        let alarmUI = graph.createNode('', x + 30, y - 30);
        alarmUI.image = 'assets/room/alarmred.svg';
        alarmUI.size = {width: 30};
        alarmUI.zIndex = 999;
        alarmUI.host = demo;
        alarmUI.parent = demo;
    }

    /**
     * 绘制基建
     * @param Q
     * @param graph
     */
    public static drawRoomWall(Q, graph, x, y): void {
        let demo = graph.createNode('', x, y);
        demo.image = 'assets/room/mx-cabinet2.svg';
        demo.size = {width: 10, height: 60};
        demo.set('type', 'roomWall');
    }

    /**
     * 绘制自定义机柜
     * @param Q
     * @param graph
     */
    public static drawCustomCabinet(Q, graph, x, y): void {
        let demo = graph.createNode('自定义', x, y);
        demo.image = 'assets/room/mx-cabinet4white.svg';
        demo.size = {width: 50, height: 50};
        demo.set('type', 'customCabinet');
        demo.setStyle(Q.Styles.LABEL_OFFSET_Y, -50 / 2);
        demo.setStyle(Q.Styles.BORDER, 1);
        demo.setStyle(Q.Styles.BORDER_RADIUS, 0);
    }

}
