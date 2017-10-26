import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class RoomSerService {

    constructor(private http: HttpClient) {
    }

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
    getRoomInfo(roomId: number): any {
        this.http.get(`/itm/rooms/queryRoom/${roomId}`).subscribe(data => {
            if (data['code'] === 0) {
                console.log(data);
                return data;
            } else {
                alert(data['msg']);
                return;
            }
        });
    }

    /**
     * 保存页面中的机柜信息
     * @param {}
     * */
    saveRoomInfo(obj) {
        this.http.put(`/itm/rooms/updateCabinetSet/`, obj).subscribe(data => {
            if (data['code'] === 0) {
                console.log('数据保存成功');
                console.log(data);
            }else {
                console.log("网络异常");
            }
        });
    }
}

export class roomcabinet {
    constructor(public name: string,
                public id: number,
                public x: number,
                public y: number,
                public w: number,
                public h: number,
                public img: string) {
    }
}
