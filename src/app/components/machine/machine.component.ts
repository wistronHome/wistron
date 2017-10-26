import {Component, OnInit} from '@angular/core';

import {Router, ActivatedRoute} from '@angular/router';
import {MachineService} from './machine.service';
import {Room, Cabinet, Servicer} from '../../models/index';
import {fadeLeftIn} from "../../animations/fade-left-in";
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-machine',
    templateUrl: './machine.component.html',
    styleUrls: ['./machine.component.scss'],
    providers: [MachineService],
    animations: [
        fadeLeftIn
    ]
})
export class MachineComponent implements OnInit {
    data: Room[] = [];
    isCollapse: boolean = true;
    isVisible: boolean = false;
    searchValue: string = '';
    ass = {
        rooms: [],
        cabinets: [],
        servicers: []
    };
    datas: any;
    cabinetDatas: any;

    constructor(private router: Router,
                private $message: NzMessageService,
                private $modal: NzModalService,
                private $service: MachineService,
                private http: HttpClient) {
    }

    ngOnInit() {
        this.data.push(this.$service.getMachines());
        this.data.push(this.$service.getMachines());
        this.getRoomDatas();
    }

    $watchSearch(currentValue) {
        this.searchValue = currentValue.trim();
        if (this.searchValue) {
            this.ass = {
                rooms: [],
                cabinets: [],
                servicers: []
            };
            this.data.forEach(room => {
                if (room.name.toUpperCase().includes(this.searchValue.toUpperCase())) {
                    if (this.ass.rooms.length < 5) {
                        let {id, name} = room;
                        this.ass.rooms.push({id, name});
                    }
                }
                room.cabinets.forEach(cabinet => {
                    if (cabinet.name.toUpperCase().includes(this.searchValue.toUpperCase())) {
                        if (this.ass.cabinets.length < 5) {
                            this.ass.cabinets.push({
                                id: cabinet.id,
                                name: cabinet.name,
                                parent: room.name
                            });
                        }
                    }
                    cabinet.servicers.forEach(server => {
                        if (server.name.toUpperCase().includes(this.searchValue.toUpperCase())) {
                            if (this.ass.servicers.length < 5) {
                                this.ass.servicers.push({
                                    id: server.id,
                                    name: server.name,
                                    parent: room.name + ' => ' + cabinet.name
                                });
                            }
                        }
                    });
                });
            });
        } else {

        }
    }

    toggleMenu(item, roomId, ev) {
        item.isOpen = !item.isOpen;
        this.getCabinetDatas(roomId, item);
        ev.stopPropagation();
    }

    createRoom() {
        this.isVisible = true;
    }

    /**
     * 接受子组件属性变化
     * @param {boolean} flag
     */
    onVoted(flag: boolean) {
        this.isVisible = flag;
        /*接收了子组件传过来的消息刷新一下房间数据*/
        this.getRoomDatas();
    }

    saveRoom(): void {

    }

    toggleCollapse(): void {
        this.isCollapse = !this.isCollapse;
    }

    /*获取机房数据*/
    getRoomDatas() {
        this.http.get('/itm/rooms').subscribe(data => {
            console.log(data);
            this.datas = data['data'];
        });
    }

    /*获取机柜*/
    getCabinetDatas(roomId, item) {
        this.http.get(`/itm/rooms/queryRoom/${roomId}`).subscribe(data => {
            console.log(data);
            // this.datas = data['data'];
            item.cabinetDatas = data['data'].cabinetSet;
        });
    }

    /*删除机房*/
    delroom(roomId) {
        this.http.delete(`/itm/rooms/deleteRoom/${roomId}`).subscribe(data => {
            console.log(data);
            if (data['code'] === 0) {
                /*重新获取机房数据*/
                this.getRoomDatas();
            } else if (data['code'] === 10101) {
                this.$message.create('error', data['msg']);
            }
        });
    }

    /*删除机柜*/
    delCabinet(cabinetId, roomId, item) {
        this.delCabinetRes(cabinetId).then(e => {
            this.getCabinetDatas(roomId, item);
        });
    }

    delCabinetRes(cabinetId): Promise<object> {
        var promise = new Promise((resolve, reject) => {
            this.http.delete(`/itm/cabinet/deleteCabinet/${cabinetId}`).subscribe(data => {
                if (data['code'] === 0) {
                    /*删除成功*/
                    resolve();
                } else {
                    /*删除失败*/
                    reject();
                }
            });
        });
        return promise;
    }
}
