import { Injectable } from '@angular/core';

@Injectable()
export class RoomSerService {

  constructor() { }
  getCabinetInfo() {
    return [
          new roomcabinet('jjjppp', 429, 100, 150, 60, 40, "assets/room/mx-cabinet4red.svg"),
          new roomcabinet('42U-023', 431, 100, 190, 60, 40, "assets/room/mx-cabinet4red.svg"),
          new roomcabinet('42U-022', 42, 100, 230, 60, 40, "assets/room/mx-cabinet4.svg"),
          new roomcabinet('42U-d23', 49, 100, 270, 60, 40, "assets/room/mx-cabinet4.svg"),
          new roomcabinet('42U-023', 489, 100, 310, 60, 40, "assets/room/mx-cabinet4red.svg"),
          new roomcabinet('jjjppp', 429, 200, 150, 60, 40, "assets/room/mx-cabinet4red.svg"),
          new roomcabinet('42U-023', 431, 200, 190, 60, 40, "assets/room/mx-cabinet4red.svg"),
          new roomcabinet('42U-022', 42, 200, 230, 60, 40, "assets/room/mx-cabinet4.svg"),
          new roomcabinet('42U-d23', 49, 200, 270, 60, 40, "assets/room/mx-cabinet4.svg"),
          new roomcabinet('42U-023', 489, 200, 310, 60, 40, "assets/room/mx-cabinet4red.svg")
        ];
  }
  /**
   * 页面进入获取机房的信息
   * getRoomInfo
   * */
  getRoomInfo() {

  }
}

export class roomcabinet{
  constructor(
    public name: string,
    public id: number,
    public x: number,
    public y: number,
    public w: number,
    public h: number,
    public img: string
  ){}
}
