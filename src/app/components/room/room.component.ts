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
        ]),
        trigger('toolsState', [
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
    model="";
    id = '';
    ChildId='';
    constructor() {
    }

    ngOnInit() {
        var Q = window['Q']
        var graph = new Q.Graph('mcRoom');
        //设置坐标原点
        graph.originAtCenter = false;

        //绘制横线
        for (var i = 0; i < 41; i++) {
            var row = graph.createShapeNode();
            var height = i * 15;
            row.moveTo(0, height);
            row.lineTo(780, height);
            row.setStyle(Q.Styles.SHAPE_STROKE_STYLE, 'black');
            row.setStyle(Q.Styles.SHAPE_STROKE, 0.5)
            row.setStyle(Q.Styles.SHAPE_LINE_DASH, [5, 2]);
            row.isSelected = function () {
                return false;
            };
            row.isMovable = function () {
                return false;
            };
            if (i % 4 == 0) {
                row.setStyle(Q.Styles.SHAPE_LINE_DASH, [5, 0]);
            }
        }
        //绘制竖线
        for (var i = 0; i < 53; i++) {
            var line = graph.createShapeNode();
            var width = i * 15;
            line.moveTo(width, 0)
            line.lineTo(width, 600)
            line.setStyle(Q.Styles.SHAPE_STROKE_STYLE, 'black');
            line.setStyle(Q.Styles.SHAPE_LINE_DASH, [5, 2]);
            if (i % 4 == 0) {
                line.setStyle(Q.Styles.SHAPE_LINE_DASH, [5, 0]);

            }
        }
        //设置是否能被选择
        graph.isSelectable =  (item)=> {
            // console.log(item);
            return item.name === "computer";
        };
        graph.editable = (item)=> {
            console.log(item);
            return item.name === "computer";
        }
        //鼠标按下之后记录按下的信息
        var src, startX, startY;
        document.onmousedown =  (e)=> {
            console.log(e.target['src']);
            
               src= e.target['src'] && e.target['src'].includes("svg") ? e.target['src'].split("/")[4] : 'aaaa';
                // src = e.target['src'].split("/")[4];
                startX = e.offsetX;
                startY = e.offsetY;
            
            
        }
        document.onmousemove =  (e)=> {


        }
        document.ondrop = (e)=> {
            var p = graph.toLogical(e.offsetX, e.offsetY)
            var computer = graph.createNode("computer", p.x, p.y);
            let image = 'assets/' + src;
            console.log(image);
        
            computer.image = image;
            computer.size = {width: 60 }
            var alarmUI = graph.createNode( '' ,p.x+30,p.y-30)
            alarmUI.image = 'assets/alarmred.svg';
            alarmUI.size = { width: 30 }
            alarmUI.zIndex=999;
            alarmUI.host = computer;
            alarmUI.parent = computer;
            //数据的存储
            var arr = [];
            model.forEach( (node)=> {
                if (node.$name === "computer") {
                    var element = {name: '', id: '', x: '', y: ''}
                    element.name = node.name
                    element.id = node.id;
                    element.x = node.x;
                    element.y = node.y;
                    arr.push(element)
                    console.log(arr);
                }
            });
        }


        var model = graph.graphModel; 
        this.model=model;
        //数据的渲染
        var info = [{name: 'jjj', id: '1', x: 200, y: 200}, {name: 'ppp', id: '2', x: 300, y: 300}]
        for (var i = 0; i < info.length; i++) {
            graph.createNode(info[i].name, info[i].x, info[i].y)
        }
        //点击机房
        graph.onclick = e => {
            // console.log(e);
            // console.log(e.getUI());
            // console.log(e.getData().type);
            if( e.getData()&&e.getData().type =="Q.Node"){
                this.id = e.getData().id;
                //子图元的id
                if(e.getData().data){
                this.ChildId = e.getData().data.children.datas[0].id;
                }
            this.state = 'active';
            }
            
        }

    }
    delCabinet(): void {
        this.model['removeById'](this.id)
        this.model['removeById'](this.ChildId)
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
    toolsToggle():void{
        if (this.state1 === 'active') {
            // this.state = 'active';
            this.state1 = 'inactive';
        } else {
            this.state1 = 'active';
            this.state = 'inactive';
        }
    }

}
