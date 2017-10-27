import { Component, OnInit } from '@angular/core'
import { MissionService } from "../../../../mission-store/mission.service";
import { ManagerService } from "../manager.service";
import { NzMessageService } from 'ng-zorro-antd';
import { Utils } from "../../../../models";

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
    search = {
        name: '',
        code: ''
    };
    currentSeries;
    constructor(
        private $mission: MissionService,
        private $service: ManagerService,
        private $message: NzMessageService
    ) {
        $mission.pageChangeHook.subscribe(page => {
            this.pageIndex = page.pageIndex;
            this.pageSize = page.pageSize;
        });
    }
    ngOnInit() {}
}

