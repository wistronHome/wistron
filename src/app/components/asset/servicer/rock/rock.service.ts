import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Rock, Utils, Result } from "../../../../models";

@Injectable()
export class RockService {
    constructor(
        private $http: HttpClient
    ) {

    }

    /**
     * 分页获取服务器信息
     * @param {number} pageIndex
     * @param {number} pageSize
     * @param search
     * @param callback
     */
    public getRockByField(pageIndex: number, pageSize: number, search, callback: Function) {
        let page = {
            pageNum: pageIndex,
            pageSize
        };
        let body = Object.assign(page, search);
        console.log(body);
        this.$http.post(`/itm/bsserver`, body).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 批量删除服务器信息
     * @param {number[]} ids
     * @param callback
     */
    public deleteServers(ids: number[], callback) {
        let str = '';
        ids.forEach((item, index) => {
            str += item;
            if (index !== ids.length - 1) {
                str += '-';
            }
        });
        this.$http.delete(`/itm/bsserver/${str}`).subscribe((result: Result) => {
            console.log('delete', result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 下架
     * @param {number} id
     * @param {Function} callback
     */
    public offShelves(id: number, callback: Function) {
        this.$http.delete(`/itm/bsserver/bsShelvesDelete?bsshelvesId=${id}`).subscribe((result: Result) => {
            console.log('shelves', result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 上架
     * @param {number} bserverId
     * @param {{computerRoomId: number; cabinetId: number; startU: number}} position
     * @param {Function} callback
     */
    public onShelves(bserverId: number, position: { computerRoomId: number, cabinetId: number, startU: number }, callback: Function) {
        let body = { bserverId, compoterRoomId: position.computerRoomId, cabinetId: position.cabinetId, startU: position.startU };
        this.$http.post(`/itm/bsserver/bsShelvesInsert`, body).subscribe((result: Result) => {
            console.log('shelves', result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 获取所有机房
     * @param callback
     */
    public getAllRoom(callback) {
        this.$http.get(`/itm/rooms`).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 查询所有责任人
     */
    public getAllUser(callback) {
        this.$http.get(`/itm/users/${100}/${1}`).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 获取所有品牌
     */
    public getAllBrand(callback) {
        this.$http.get(`/itm/brand/1/100/`).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 获取所有系列
     * @param {number} parentId
     * @param callback
     */
    public getAllSeries(parentId: number, callback) {
        this.$http.get(`/itm/series/1/100/${parentId}`).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 获取所有型号
     * @param {number} parentId
     * @param callback
     */
    public getAllVersion(parentId: number, callback) {
        this.$http.get(`/itm/model/1/100/${parentId}`).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 获取机房下所有的机柜
     * @param {number} roomId
     * @param callback
     */
    public getAllCabinet(roomId: number, callback) {
        this.$http.get(`/itm/rooms/queryRoom/${roomId}`).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }
}



