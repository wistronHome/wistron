import { Component, OnInit } from '@angular/core'
import { MissionService } from "../../../../mission-store/mission.service";
import { ManagerService } from "../manager.service";
import { NzMessageService } from 'ng-zorro-antd';
import { Utils, Brand, Series } from "../../../../models";
@Component({
    selector: 'app-series',
    templateUrl: './series.component.html',
    styleUrls: [ './series.component.scss' ],
    providers: [ MissionService, ManagerService, NzMessageService ]

})

export class SeriesComponent implements OnInit {
    data = [];
    pageIndex: number = 1;
    pageSize: number = 20;
    total: number = 0;
    currentSeries: Series;
    search = {
        name: '',
        parentId: -1
    };
    brands: Brand[] = [];
    isSeriesDetailShow: boolean = false;
    seriesModalType: string = 'detail';
    constructor(
        private $mission: MissionService,
        private $service: ManagerService,
        private $message: NzMessageService
    ) {
        $mission.pageChangeHook.subscribe(page => {
            this.pageIndex = page.pageIndex;
            this.pageSize = page.pageSize;
            this.refreshSeries();
        });
    }
    ngOnInit() {
        this.$service.getAllBrand(result => {
            this.brands = result;
            console.log('brands:',  this.brands);
        });
    }

    /**
     * 模糊分页查询
     */
    public getBrandByField() {
        console.log(this.search);
        this.$service.getSeriesByField(this.pageIndex, this.pageSize, this.search, result => {
            this.data = result.data;
            this.total = result.totalCount;
        });
    }

    /**
     * 打开系列弹框
     * @param {string} param
     * @param {Series} series
     */
    public showSeries(param: string, series: Series = new Series()) {
        this.isSeriesDetailShow = true;
        this.currentSeries = Utils.cloneModel(series);
        this.seriesModalType = param;
    }

    /**
     * 新增/修改系列
     */
    public saveSeries() {
        if (this.currentSeries.id) {
            console.log(this.currentSeries);
            this.$service.modifySeries(this.currentSeries, result => {
                this.isSeriesDetailShow = false;
                this.refreshSeries();
            });
        } else {
            this.$service.insertSeries(this.currentSeries, result => {
                this.isSeriesDetailShow = false;
                this.refreshSeries();
            });
        }
    }

    /**
     * 确认删除系列
     * @param {Series} series
     */
    public confirmDelete(series: Series) {
        this.$service.deleteSeries(series, result => {
            this.refreshSeries();
        });
    }

    private refreshSeries() {
        this.$service.getSeriesPagination(this.pageIndex, this.pageSize, result => {
            this.data = result.data;
            this.total = result.totalCount;
        });
    }
}

