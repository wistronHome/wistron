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
    searchName;
    VersionModalType;
    VersionDetailShow;
    currentVersion;
    selectedBrand;
    selectedSeries;
    brand;
    series;

    constructor(private $mission: MissionService,
                private $service: ManagerService,
                private $message: NzMessageService) {
        $mission.pageChangeHook.subscribe(page => {
            this.pageIndex = page.pageIndex;
            this.pageSize = page.pageSize;
            this.getVersionList();
        });
    }

    ngOnInit() {
        this.getBrand();
        this.getVersionList();
    }

    showBrand(ModalType, version: Version = new Version()) {
        this.VersionModalType = ModalType;
        this.VersionDetailShow = true;
        this.currentVersion = Utils.cloneModel(version);
        this.selectedSeries = this.currentVersion.parentBsm['id'];
        console.log(this.selectedSeries);
        this.getSeries();
        this.selectedBrand = this.currentVersion.parentBsm['parentId'];

    }

    /**
     * 获取所有的品牌信息
     */
    getBrand() {
        this.$service.getBrandPagination(1, 10, e => {
            this.brand = e.data;
            console.log(e);
        })
    }

    getSeries() {
        this.$service.getSeriesPagination(this.pageIndex, this.pageSize, e => {
            this.series = e.data;
        })
    }

    /**
     * 品牌改变之后获取系列
     */
    brandChange() {
        console.log(this.selectedBrand);
        this.series = [];

        this.$service.getSeriesByParentId(1, 10, this.selectedBrand, e => {
            this.series = e.data;
            console.log(this.series);
        });
        this.selectedSeries = null;
    }

    /**
     * 新增系列
     *
     */
    saveVersion() {
        if (this.currentVersion.id) {
            console.log(this.currentVersion);
            this.currentVersion['parentId'] = this.selectedSeries;
            this.currentVersion['parentBsm']['id'] = this.selectedSeries;
            this.currentVersion['parentBsm']['parentId'] = this.selectedBrand;
            this.currentVersion['parentBsm']['parentBsm']['id'] = this.selectedBrand;
            this.$service.modifyVersion(this.currentVersion, e => {

                this.$message.create('success', '修改成功');
                this.getVersionList();
            })
        } else {
            this.$service.insertVersion({
                id: '',
                name: this.currentVersion.name,
                description: this.currentVersion.description,
                parentId: this.selectedSeries
            }, e => {
                if (e.code === 0) {
                    this.$message.create('success', '新增成功');
                    this.getVersionList();
                } else {
                    this.$message.create('error', '名字已经存在')
                }

            })

        }
        this.VersionDetailShow = false;
    }

    /**
     * 删除型号
     */
    confirmDelete(version: Version) {
        this.$service.deleteVersion(version.id, result => {
            this.$message.success('删除成功');
            this.getVersionList();
        });
    }

    /**
     * 获取型号列表
     */
    getVersionList() {
        this.$service.getVersionPagination(this.pageIndex, this.pageSize, e => {
            this.data = e.data;
            console.log(e.data);
        })
    }

    /**
     * 查询功能
     */
    getSeriesByField() {
        this.$service.getVersionByField(this.pageIndex, this.pageSize, this.searchName, this.selectedSeries, e => {
            this.data = e.data
        })
    }


}
