import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Asset, Utils, Result } from "../../../../models";

@Injectable()
export class RockService {
    assets: Asset[] = [];
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
    public getRockByField(pageIndex: number, pageSize: number, search: any, callback) {
        let body = {
            pageNum: pageIndex,
            pageSize
        };
        this.$http.post(`/itm/bsserver`, body).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }



}

class Search {
    public pageSize: number;
    public pageNum: number;
    public computerroom_id: number;
}

