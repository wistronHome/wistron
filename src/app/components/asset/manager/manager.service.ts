import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Result, Brand } from "../../../models";

@Injectable()
export class ManagerService {
    constructor(
        private $http: HttpClient
    ) {}

    /**
     * 分页获取品牌
     * @param {number} pageIndex
     * @param {number} pageSize
     * @param callback
     */
    public getBrandPagination(pageIndex: number, pageSize: number, callback) {
        this.$http.get(`/itm/brand/${pageIndex}/${pageSize}`).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 新增品牌
     * @param {Brand} brand
     * @param callback
     */
    public insertBrand(brand: Brand, callback) {
        this.$http.post(`/itm/brand`, brand).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 根据id查询品牌信息
     * @param {number} brandId
     * @param callback
     */
    public getBrandById(brandId: number, callback) {
        this.$http.get(`/itm/bsm/${brandId}`).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 模糊查询品牌信息
     * @param {number} pageIndex
     * @param {number} pageSize
     * @param {string} search
     * @param callback
     */
    public getBrandByField(pageIndex: number, pageSize: number, search: {name: string, code: string}, callback) {
        let body = {pageNum: pageIndex, size: pageSize, name: search.name, code: search.code};
        this.$http.post(`/itm/brand/like`, body).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 修改品牌信息
     * @param {Brand} brand
     * @param callback
     */
    public modifyBrand(brand: Brand, callback) {
        this.$http.put(`/itm/bsm`, brand).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 删除品牌信息
     * @param {number} brandId
     * @param callback
     */
    public deleteBrand(brandId: number, callback) {
        this.$http.delete(`/itm/bsm/${brandId}`).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 判断name和code是否已经存在
     * @param {string} name
     * @param {string} code
     * @param callback
     */
    public validateRepeat(brand: string, code: string, callback) {
        this.$http.post(`/itm/bsm`, { name, code }).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /** =============================================================================================== */

    // public getSeriesPagination(pageIndex: number, pageSize: number, callback) {
    //     this.$http.get(``)
    // }

}

