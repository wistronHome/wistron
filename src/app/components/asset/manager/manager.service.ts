import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Result, Brand, Series, Version} from "../../../models";

@Injectable()
export class ManagerService {
    constructor(private $http: HttpClient) {
    }

    /**
     * 查询所有品牌
     */
    public getAllBrand(callback) {
        this.$http.post(`/itm/bsm/0`, {}).subscribe((result: Result) => {
            console.log('bbbbaa', result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

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
    public getBrandByField(pageIndex: number, pageSize: number, search: { name: string, code: string }, callback) {
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
        console.log('pppppppppp', brand);
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
     * @param {string} brand
     * @param {string} code
     * @param callback
     */
    public validateRepeat(brand: string, code: string, callback) {
        this.$http.post(`/itm/bsm`, {brand, code}).subscribe((result: Result) => {
            console.log(result);
            callback(result.code === 0);
        });
    }

    /** =============================================================================================== */
    /**
     * 分页查询所有系列
     * @param {number} pageIndex
     * @param {number} pageSize
     * @param callback
     */
    public getSeriesPagination(pageIndex: number, pageSize: number, callback) {
        this.$http.get(`/itm/series/${pageIndex}/${pageSize}/-1`).subscribe((result: Result) => {
            // console.log('series', result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 模糊分页查询所有系列
     * @param {number} pageIndex
     * @param {number} pageSize
     * @param {{name: string; parentId: number}} search
     * @param callback
     */
    public getSeriesByField(pageIndex: number, pageSize: number, search: {name: string, parentId: number}, callback) {
        let body = {pageNum: pageIndex, size: pageSize, name: search.name, parentId: search.parentId};
        this.$http.post(`/itm/series/like`, body).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 根据parentId查询系列
     * @param {number} parentId
     * @param {number} size
     * @param {number} pageNum
     */
    public getSeriesByParentId(pageNum: number, size: number, parentId: number, callback) {
        this.$http.get(`/itm/series/${pageNum}/${size}/${parentId}`).subscribe(data => {
            if (data['code'] === 0) {
                callback(data['data'])
            }
        })

    }

    /**
     * 根据id查询系列信息
     * @param {number} seriesId
     */
    public getSeriesById(seriesId: number, callback) {
        this.$http.get(`/itm/bsm/${seriesId}`).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 修改系列信息
     * @param {Series} series
     * @param callback
     */
    public modifySeries(series: Series, callback) {
        this.$http.put(`/itm/bsm`, series).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 新增系列
     * @param {Series} series
     * @param callback
     */
    public insertSeries(series: Series, callback) {
        this.$http.post(`/itm/series`, series).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 删除系列
     * @param {Series} series
     * @param callback
     */
    public deleteSeries(series: Series, callback) {
        this.$http.delete(`/itm/bsm/${series.id}`).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /** ========================================================================================= */

    /**
     * 新增型号
     * @param {Version} version
     * @param callback
     */
    public insertVersion(version: Version, callback) {
        this.$http.post(`/itm/model`, version).subscribe((result: Result) => {
            callback(result);
        });
    }

    /**
     * 分页查询所有型号
     * @param {number} pageIndex
     * @param {number} pageSize
     * @param callback
     */
    public getVersionPagination(pageIndex: number, pageSize: number, callback) {
        this.$http.get(`/itm/model/${pageIndex}/${pageSize}/-1`).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 根据id查询型号
     * @param {number} versionId
     * @param callback
     */
    public getVersionById(versionId: number, callback) {
        this.$http.get(`/itm.bsm/${versionId}`).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 模糊分页查询型号
     * @param {number} pageIndex
     * @param {number} pageSize
     * @param {string} name
     * @param {number} parentId
     * @param callback
     */
    public getVersionByField(pageIndex: number, pageSize: number, name: string, parentId: number, callback) {
        let body = {pageNum: pageIndex, size: pageSize, name: name, parentId: parentId};
        this.$http.post(`/itm/model/like`, body).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

    /**
     * 修改型号
     * @param {Series} series
     * @param callback
     */
    public modifyVersion(series: Series, callback) {
        console.log(series);
        // this.$http.put(`/itm/bsm`, series).subscribe((result: Result) => {
        //     console.log(result);
        //     if (result.code === 0) {
        //         callback(result.data);
        //     }
        // });
    }

    /**
     * 删除version
     * @param {number} versionId
     * @param callback
     */
    public deleteVersion(versionId: number, callback) {
        this.$http.delete(`/itm/bsm/${versionId}`).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }
}

