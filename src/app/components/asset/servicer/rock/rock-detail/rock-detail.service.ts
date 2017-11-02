import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Result } from "../../../../../models/result";

@Injectable()
export class RockDetailService {
    constructor(
        private $http: HttpClient
    ) {  }

    /**
     * 获取资产信息
     * @param {number} roomId
     * @param callback
     */
    public getRockDetailById(roomId: number, callback) {
        this.$http.get(`/itm/bsserver/${roomId}`).subscribe((result: Result) => {
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 获取硬件信息
     * @param {number} roomId
     * @param callback
     */
    public getHardwareById(roomId: number, callback) {
        this.$http.get(`/itm/bsserver/queryServerInfo?bmcIp=${roomId}`).subscribe((result: Result) => {
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
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 获取某一机房下所有机柜
     * @param {number} roomId
     * @param callback
     */
    public getCabinetById(roomId: number, callback) {
        this.$http.get(`/itm/rooms/queryRoom/${roomId}`).subscribe((result: Result) => {
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }
}
