import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var Q= window['Q']
    var graph =new Q.Graph('mcRoom');
    //设置坐标原点
    graph.originAtCenter = false;
   
    //绘制横线
    for(var i=0;i<41;i++){
    var row = graph.createShapeNode();
    var height = i*15;
    row.moveTo(0, height);
    row.lineTo(780, height);
    row.setStyle(Q.Styles.SHAPE_STROKE_STYLE, '#e92322');
    row.setStyle(Q.Styles.SHAPE_STROKE,0.5)
    row.setStyle(Q.Styles.SHAPE_LINE_DASH, [5,2]);
    row.isSelected = function(){ return false;};
    row.isMovable = function(){ return false;};
    if(i%4==0){
      row.setStyle(Q.Styles.SHAPE_LINE_DASH, [5,0]);
    }
  }
  //绘制竖线
  for( var i=0; i<53; i++){
    var line = graph.createShapeNode();
    var width= i*15;
    line.moveTo(width,0)
    line.lineTo(width,600)
    line.setStyle(Q.Styles.SHAPE_STROKE_STYLE, 'green');
    line.setStyle(Q.Styles.SHAPE_LINE_DASH, [5,2]);
    if(i%4==0){
      line.setStyle(Q.Styles.SHAPE_LINE_DASH, [5,0]);
        
    }
  }
  //设置是否能被选择
  graph.isSelectable = function(item){ 
			console.log(item);		
			return item.name === "computer";
	};
   graph.editable = function(item){
      console.log(item);
      return item.name === "computer";
    }
  //鼠标按下之后记录按下的信息
  var src ,startX,startY;
	document.onmousedown=function(e){
		// console.log(e);
		src = e.target['src'].split("/")[4];
		// console.log(src);
	
		startX=e.offsetX;
		startY=e.offsetY;
	}
	document.onmousemove=function(e){
		
		
	}
	document.ondrop=function(e){
		// console.log('鼠标弹起的e');
			// console.log(e);
		var p =	graph.toLogical(e.offsetX,e.offsetY)
    var computer= graph.createNode("computer",p.x,p.y)
    computer.image='assets/'+src;
    computer.size = {width: 60}
    //数据的存储
    var arr = [];
    model.forEach(function(node){
        if( node.$name === "computer" ){
        var element = { name:'',id:'',x:'',y:'' }
        element.name = node.name
        element.id = node.id;
        element.x = node.x;
        element.y = node.y;
        arr.push( element )
        console.log( arr );
      }
    });
	}


	var model = graph.graphModel;
	//数据的渲染
	var info = [{name:'jjj',id:'1',x:200,y:200},{name:'ppp',id:'2',x:300,y:300}]
	for(var i=0; i<info.length; i++ ){
	 graph.createNode(info[i].name,info[i].x,info[i].y)
	}


  }

}
