import {Component, OnInit} from '@angular/core'
import {MissionService} from "../../../../mission-store/mission.service";
import {ManagerService} from "../manager.service";
import {NzMessageService} from 'ng-zorro-antd';
import {Version, Utils} from "../../../../models";


@Component({
    selector: 'app-version',
    templateUrl: './version.component.html',
    styleUrls: ['./version.component.scss'],
    providers: [MissionService, ManagerService, NzMessageService]
})
export class VersionComponent implements OnInit {

    data = [];
    pageIndex: number = 1;
    pageSize: number = 20;
    search = {
        name: '',
        code: ''
    };
    VersionModalType;
    VersionDetailShow;
    currentVersion;
    constructor(private $mission: MissionService,
                private $service: ManagerService,
                private $message: NzMessageService) {
        $mission.pageChangeHook.subscribe(page => {
            this.pageIndex = page.pageIndex;
            this.pageSize = page.pageSize;
        });
    }

    ngOnInit() {
    }

    showBrand(ModalType, version: Version = new Version()) {
        this.VersionModalType = ModalType;
        this.VersionDetailShow = true;
        this.currentVersion = Utils.cloneModel(version);
    }

}
