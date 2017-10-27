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
        code: ''
    };
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
    ngOnInit() {}

    /**
     * 打开系列弹框
     * @param {string} param
     * @param {Series} series
     */
    public showSeries(param: string, series: Series = new Series()) {
        this.isSeriesDetailShow = true;
        this.currentSeries = series;
        this.seriesModalType = param;
    }

    /**
     * 新增/修改系列
     */
    public saveSeries() {
        if (this.currentSeries.id) {
            this.$service.validateRepeat(this.currentSeries.name, '', result => {
                if (result) {
                    this.$service.modifySeries(this.currentSeries, result => {
                        this.refreshSeries();
                    });
                }
            });
        } else {

        }
    }

    private refreshSeries() {
        this.$service.getSeriesPagination(this.pageIndex, this.pageSize, result => {
            this.data = result.data;
            this.total = result.totalCount;
        });
    }
}

