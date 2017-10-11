import {Component, OnInit} from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';

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
    ]
})
export class RoomComponent implements OnInit {
    state: string = 'active';
    state1: string = 'inactive';
    Q = window['Q'];
    graph = null;
    model = '';
    id = '';
    ChildId = '';

    constructor() {
    }

    ngOnInit() {
        this.graph = new this.Q.Graph('mcRoom');
        //设置坐标原点
        this.graph.originAtCenter = false;
        //机房宽7.8米 高6米 比例1米=100px 方格为15px*15px的正方形;
        //绘制横线
        var roomWidth = 900, roomHeight = 500;
        roomWidth = roomWidth % 60 == 0 ? roomWidth : Math.floor(roomWidth / 60) * 45;
        roomHeight = roomHeight % 60 == 0 ? roomHeight : Math.floor(roomHeight / 60) * 45;
        var rowNumber = roomHeight / 15
        for (var i = 0; i < rowNumber + 1; i++) {
            var row = this.graph.createShapeNode();
            var height = i * 15;
            row.moveTo(0, height);
            row.lineTo(roomWidth, height);
            row.setStyle(this.Q.Styles.SHAPE_STROKE_STYLE, 'black');
            row.setStyle(this.Q.Styles.SHAPE_STROKE, 0.5);
            row.setStyle(this.Q.Styles.SHAPE_LINE_DASH, [5, 2]);
            row.isSelected = function () {
                return false;
            };
            row.isMovable = function () {
                return false;
            };
            if (i % 3 === 0) {
                row.setStyle(this.Q.Styles.SHAPE_LINE_DASH, [5, 0]);
            }
        }
        //绘制竖线
        var lineNumber = roomWidth / 15;
        for (var i = 0; i < lineNumber + 1; i++) {
            var line = this.graph.createShapeNode();
            var width = i * 15;
            line.moveTo(width, 0);
            line.lineTo(width, roomHeight);
            line.setStyle(this.Q.Styles.SHAPE_STROKE_STYLE, 'black');
            line.setStyle(this.Q.Styles.SHAPE_LINE_DASH, [5, 2]);
            if (i % 3 == 0) {
                line.setStyle(this.Q.Styles.SHAPE_LINE_DASH, [5, 0]);

            }
        }
        //设置是否能被选择
        this.graph.isSelectable = (item) => {
            // console.log(item);
            return item.name === "computer";
        };
        // graph.editable = (item) => {
        //     console.log(item);
        //     return item.name === "computer";
        // }
        //鼠标按下之后记录按下的信息
        var src, startX, startY;
        document.ondragstart = (e) => {
            console.log(e.target['src'].split("/"));
            src = e.target['src'] && e.target['src'].includes("svg") ? e.target['src'].split("/")[5] : 'aaaa';
            // src = e.target['src'].split("/")[4];
            startX = e.offsetX;
            startY = e.offsetY;
        }
        document.onmousemove = (e) => {


        }
        document.ondrop = (e) => {
            //位置的矫正 还没有做警示图标的矫正
            let x = e.offsetX % 15 > 8 ? Math.ceil(e.offsetX / 15) * 15 : Math.floor(e.offsetX / 15) * 15;
            let y = e.offsetY % 15 > 8 ? Math.ceil(e.offsetY / 15) * 15 : Math.floor(e.offsetY / 15) * 15;
            var p = this.graph.toLogical(x, y);
            var computer = this.graph.createNode('computer', p.x, p.y);
            let image = 'assets/room/' + src;
            console.log(image);
            computer.image = image;
            computer.size = {width: 60};
            var alarmUI = this.graph.createNode('', p.x + 30, p.y - 30);
            alarmUI.image = 'assets/room/alarm-pink.svg';
            alarmUI.size = {width: 30};
            alarmUI.zIndex = 999;
            alarmUI.host = computer;
            alarmUI.parent = computer;
            //数据的存储
            let arr = [];
            model.forEach((node) => {
                if (node.$name === 'computer') {
                    var element = {name: '', id: '', x: '', y: ''};
                    element.name = node.name;
                    element.id = node.id;
                    element.x = node.x;
                    element.y = node.y;
                    arr.push(element);
                    console.log(arr);
                }
            });
        };


        var model = this.graph.graphModel;
        this.model = model;
        //假数据的渲染
        let info = [{name: 'jjj', id: '1', x: 200, y: 200}, {name: 'ppp', id: '2', x: 280, y: 200}, {
            name: 'ppp',
            id: '3',
            x: 360,
            y: 200
        },
            {name: 'jjj', id: '1', x: 200, y: 280}, {name: 'ppp', id: '2', x: 280, y: 280}, {
                name: 'ppp',
                id: '3',
                x: 360,
                y: 280
            }
        ];
        for (var i = 0; i < info.length; i++) {
            var demo = this.graph.createNode(info[i].name, info[i].x, info[i].y);
            demo.image = 'assets/room/mx-cabinet2.svg'
            demo.size = {width: 60};
        }
        //点击机房
        this.graph.onclick = e => {
            // console.log(e);
            // console.log(e.getUI());
            // console.log(e.getData().type);
            if (e.getData() && e.getData().type == "Q.Node") {
                this.id = e.getData().id;
                //子图元的id
                if (e.getData().data) {
                    this.ChildId = e.getData().data.children.datas[0].id;
                }
                this.state = 'active';
            }
        };
        //图元的拖拽位置吸附
        this.graph.startdrag = e => {

        }
        this.graph.enddrag = e => {

            if (e.getData()) {
                e.getData().x = e.getData().x % 15 > 8 ? Math.ceil(e.getData().x / 15) * 15 : Math.floor(e.getData().x / 15) * 15;
                e.getData().y = e.getData().y % 15 > 8 ? Math.ceil(e.getData().y / 15) * 15 : Math.floor(e.getData().y / 15) * 15;
            }
        }
    }

    delCabinet(): void {
        this.model['removeById'](this.id);
        this.model['removeById'](this.ChildId);
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
        // if (this.state1 === 'active') {
        //     // this.state = 'active';
        //     this.state1 = 'inactive';
        // } else {
        //     this.state1 = 'active';
        //     this.state = 'inactive';
        // }
    }

    // 弹框修改机房大小
    isVisible = false;
    isConfirmLoading = false;

    showModal = () => {
        this.isVisible = true;
    }

    handleOk = (e) => {
        this.isConfirmLoading = true;
        setTimeout(() => {
            this.isVisible = false;
            this.isConfirmLoading = false;
        }, 2000);
    }

    handleCancel = (e) => {
        this.isVisible = false;
    }
}
