import { Component, OnInit } from '@angular/core'
import { MissionService } from "../../../../mission-store/mission.service";
import { ManagerService } from "../manager.service";
import { NzMessageService } from 'ng-zorro-antd';
import { Brand, Utils} from "../../../../models";

@Component({
    selector: 'app-brand',
    templateUrl: './brand.component.html',
    styleUrls: [ './brand.component.scss' ],
    providers: [ MissionService, ManagerService, NzMessageService ]
})

export class BrandComponent implements OnInit {
    data = [];
    pageIndex: number = 1;
    pageSize: number = 20;
    total: number = 45;
    currentBrand: Brand;
    search = {
        name: '',
        code: ''
    };
    isBrandDetailShow: boolean = false;
    brandModalType: string = 'detail';
    constructor(
        private $mission: MissionService,
        private $service: ManagerService,
        private $message: NzMessageService
    ) {
        $mission.pageChangeHook.subscribe(page => {
            this.pageIndex = page.pageIndex;
            this.pageSize = page.pageSize;
           this.refreBrand();
        });
    }
    ngOnInit() {
    }

    /**
     * 点击新增按钮
     */
    showBrand(param: string, brand: Brand = new Brand()) {
        this.brandModalType = param;
        this.isBrandDetailShow = true;
        this.currentBrand = Utils.cloneModel(brand);
    }

    /**
     * 新增/修改 品牌
     */
    saveBrand() {
        if (this.currentBrand.id) {
            this.$service.validateRepeat(this.currentBrand.name, this.currentBrand.code, result => {
                if (result) {
                    this.$service.modifyBrand(this.currentBrand, result => {
                        this.isBrandDetailShow = false;
                        this.refreBrand();
                    });
                }
            });
        } else {
            this.$service.validateRepeat(this.currentBrand.name, this.currentBrand.code, result => {
                if (result) {
                    this.$service.insertBrand(this.currentBrand, result => {
                        this.isBrandDetailShow = false;
                        this.refreBrand();
                    });
                } else {
                    this.$message.success('已经存在~');
                }
            })
        }
    }

    /**
     * 模糊查询
     */
    getBrandByField() {
        this.$service.getBrandByField(this.pageIndex, this.pageSize, this.search, result => {

        });
    }

    /**
     * 确认删除品牌
     * @param {Brand} brand
     */
    confirmDelete(brand: Brand) {
        this.$service.deleteBrand(brand.id, result => {
            this.$message.success('删除成功');
            this.refreBrand();
        });
    }
    cancel() {}


    private refreBrand() {
        this.$service.getBrandPagination(this.pageIndex, this.pageSize, result => {
            this.data = result.data;
            console.log(this.data);
        })
    }
}



