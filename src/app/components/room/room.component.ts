import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
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
    name = '';
    ChildId = '';
    restX=null;
    restY=null;

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        this.graph = new this.Q.Graph('mcRoom');
        //设置坐标原点
        this.graph.originAtCenter = false;
        //机房宽7.8米 高6米 比例1米=100px 方格为15px*15px的正方形;
        var roomWidth = 800, roomHeight = 600;
        tools.drawRoom(this.Q,this.graph,roomWidth,roomHeight);
        //设置是否能被选择
        this.graph.isSelectable = (item) => {
            // console.log(item.agentNode.type);
            return item.agentNode.type === 'Q.Node';
        };
        // graph.editable = (item) => {
        //     console.log(item);
        //     return item.name === "computer";
        // }
        //鼠标按下之后记录按下的信息
        var src, startX, startY;
        document.ondragstart = (e) => {
            src = e.target['src'] && e.target['src'].includes("svg") ? e.target['src'].split("/")[5] : 'aaaa';
            startX = e.offsetX;
            startY = e.offsetY;
        }
        document.onmousemove = (e) => {


        }
        document.ondrop = (e) => {
            //位置的矫正 还没有做警示图标的矫正
            console.log(e);
            if( tools.checkOverLap(this.model,e)){
                alert('目标重合请重试');
                return;
            }
            let x = tools.correctLocation( e.offsetX );
            let y = tools.correctLocation( e.offsetY );
            var p = this.graph.toLogical(x, y);
            var computer = this.graph.createNode('新增机柜', p.x, p.y);
            let image = 'assets/room/' + src;
            computer.image = image;
            computer.size = {width: 60,height: 40,};
            var alarmUI = this.graph.createNode('', p.x + 30, p.y - 30);
            alarmUI.image = 'assets/room/alarm-pink.svg';
            alarmUI.size = {width: 30};
            alarmUI.zIndex = 999;
            alarmUI.host = computer;
            alarmUI.parent = computer;
        };


        var model = this.graph.graphModel;
        this.model = model;
        //假数据的渲染
        let info = [{name: "jjj", id: 429, x: 60, y: 60, w: 60, img:"assets/room/mx-cabinet2.svg"},
        {name: "ppp", id: 430, x: 150, y: 60, w: 60, img:"assets/room/mx-cabinet2.svg"},
        {name: "ppp", id: 431, x: 240, y: 60, w: 60, img:"assets/room/mx-cabinet2.svg"},
        {name: "ppp", id: 431, x: 330, y: 60, w: 60, img:"assets/room/mx-cabinet2.svg"},
        {name: "42U机柜600*1200(竖)", id: 432, x: 60, y: 165, w: 60, img:"assets/room/mx-cabinet2.svg"},
        {name: "42U机柜(竖)", id: 433, x: 420, y: 60, w: 60, img:"assets/room/mx-cabinet2.svg"},
        {name: "新增机柜", id: 711, x: 150, y: 165, w: 60, img:"assets/room/mx-cabinet2.svg"},
        {name: "新增机柜", id: 719, x: 240, y: 165, w: 60, img:"assets/room/mx-cabinet2.svg"},
        {name: "新增机柜", id: 727, x: 330, y: 165, w: 60, img:"assets/room/mx-cabinet2.svg"},
        {name: "新增机柜", id: 735, x: 420, y: 165, w: 60, img:"assets/room/mx-cabinet2.svg"},
        {name: "新增机柜(绿色)", id: 743, x: 60, y: 315, w: 60, img:"assets/room/mx-cabinet4.svg"},
        {name: "新增机柜(绿色)", id: 751, x: 150, y: 315, w: 60, img:"assets/room/mx-cabinet4.svg"},
        {name: "新增机柜(绿色)", id: 759, x: 240, y: 315, w: 60, img:"assets/room/mx-cabinet4.svg"},
        {name: "新增机柜(绿色)", id: 767, x: 330, y: 315, w: 60, img:"assets/room/mx-cabinet4.svg"},
        {name: "新增机柜(绿色)", id: 775, x: 420, y: 315, w: 60, img:"assets/room/mx-cabinet4.svg"}
        ]
        for (var i = 0; i < info.length; i++) {
            var demo = this.graph.createNode(info[i].name, info[i].x, info[i].y);
            demo.image = info[i].img
            demo.size = {width: info[i].w};
            let alarmUI = this.graph.createNode('', info[i].x + 30, info[i].y - 30);
            alarmUI.image = 'assets/room/alarm-pink.svg';
            alarmUI.size = {width: 30};
            alarmUI.zIndex = 999;
            alarmUI.host = demo;
            alarmUI.parent = demo;
        }
        //点击机房
        this.graph.onclick = e => {
            if (e.getData() && e.getData().type == "Q.Node") {
                // console.log(e.getData());
                
                this.id = e.getData().id;
                this.name = e.getData().name;
                //子图元的id
                if (e.getData().data) {
                    this.ChildId = e.getData().data.children.datas[0].id;
                }
                // this.state = this.state ==='active'? 'inactive':'active';
                this.state = 'active';
                
                
            }
        };
        //右键改名字
        /**
         * 双击进入机柜页面
         */
        this.graph.ondblclick = e => {
            if( e.getData() && e.getData().type == 'Q.Node'){
                this.router.navigate(['machine/cabinet/' + e.getData().id])
            }
        }
        //图元的拖拽位置吸附
        this.graph.startdrag = e => {
            //记录下位置让目标退回到原来的位置
            if(e.getData()&&e.getData().type !=='Q.ShapeNode'){
                this.restX = e.getData().x;
                this.restY = e.getData().y;
            }
            
        }
        this.graph.enddrag = e => {
            if (e.getData()&&e.getData().type !=='Q.ShapeNode') {
                if( tools.checkOverLap(this.model,e)){
                    e.getData().x = this.restX;
                    e.getData().y = this.restY;
                    e.getData().children.datas[0].x=e.getData().x+30;
                    e.getData().children.datas[0].y=e.getData().y-30;
                    alert('目标重合了 请重试');
                }else{
                    e.getData().x = tools.correctLocation(e.getData().x);
                    e.getData().y = tools.correctLocation(e.getData().y);
                    //设置告警图标的位置
                    if( e.getData().childrenCount !==0 ){
                    e.getData().children.datas[0].x=e.getData().x+30;
                    e.getData().children.datas[0].y=e.getData().y-30;
                    }
                }
                
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
    roomWidth = null;
    roomHeight = null;
    showModal = () => {
        this.isVisible = true;
    }

    handleOk = (e) => {
        this.isConfirmLoading = true;
        console.log(this.roomHeight);
        console.log(this.roomWidth);
        
        setTimeout(() => {
            this.isVisible = false;
            this.isConfirmLoading = false;

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
            if (item.agentNode.type === 'Q.Node') {
                console.log(item);
                var element = {name: '', id: '', x: '', y: '',w:'',h:'',img:'',alarm: null };
                element.name = item.name;
                element.id = item.id;
                element.x = item.x;
                element.y = item.y;
                element.w = item.size.width;
                element.h = item.h;
                element.img= item.image;
                if(item.childrenCount==1){
                    element.alarm = item.children.datas[0]
                }else{
                    element.alarm = null;
                }
                arr.push(element);
            }
        });
        console.dir(arr);
    }
}
class tools {
    /**
     * 判断机柜之间是否都重叠
     * @param model
     * @param e
     * @returns {boolean}
     */
    public static checkOverLap (model, e) :boolean {
        if(e.getData){
            var _minx = e.getData().x- e.getData().size.width/2,
                _maxx = e.getData().x + e.getData().size.width/2,
                _miny = e.getData().y- e.getData().size.width/2,
                _maxy = e.getData().y + e.getData().size.width/2,
                isOverLap=false;
        }else{
            let width = 50 ;
            _minx = e.offsetX - width/2,
            _maxx = e.offsetX + width/2,
            _miny = e.offsetY- width/2,
            _maxy = e.offsetY + width/2,
            isOverLap=false;
            }
        model['forEach'](item =>{
            if( !item.size||item.type=='Q.ShapeNode'||item.host){
                return;
            }
            let minx = item.x-item.size.width/2,
                maxx = item.x+item.size.width/2,
                miny = item.y -item.size.width/2,
                maxy = item.y + item.size.width/2;
                if(((_minx>minx&&_minx<maxx&&_maxx>maxx)&&(_miny>miny&&_miny<maxy&&_maxy>maxy||_miny==miny))||
                ((_minx>minx&&_minx<maxx&&_maxx>maxx)&&(_maxy>miny&&_maxy<maxy)&&_miny<miny)||
                ((_maxx>minx&&_maxx<maxx&&_minx<minx)&&((_maxy>miny&&_maxy<maxy)&&_miny<miny))||
                ((_maxx>minx&&_maxx<maxx&&_minx<minx)&&(_miny>miny&&_miny<maxy&&_maxy>maxy))
                ){
                    isOverLap = true;
                    return 
                }
        })
        return isOverLap
    }
    /**
     * 调整位置自动贴边
     * @param number
     * @returns {number}
     */
    public static correctLocation ( number ) :number{
        let newNumber = number % 10 >5 ?Math.ceil(number / 10) * 10 : Math.floor(number / 10) * 10;
        return newNumber;
    }
    /**
     * 绘制机房
     * @param Q
     * @param graph
     * @param roomWidth
     * @param roomHeight
     */
    public static drawRoom (Q,graph,roomWidth ,roomHeight) :void {
        //绘制横线
        var roomWidth = roomWidth, roomHeight = roomHeight;
        roomWidth = roomWidth % 30 == 0 ? roomWidth : Math.floor(roomWidth / 30) * 20;
        roomHeight = roomHeight % 30 == 0 ? roomHeight : Math.floor(roomHeight / 30) * 20;
        var rowNumber = roomHeight / 10
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
        //绘制竖线
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
}