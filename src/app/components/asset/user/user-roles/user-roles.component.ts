import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Role } from '../../../../models'
import { UserService } from '../user.service'
import { MissionService } from '../../../../mission-store/mission.service'
import { NzModalService } from 'ng-zorro-antd'

@Component({
    selector: 'app-user-roles',
    templateUrl: './user-roles.component.html',
    styleUrls: ['./user-roles.component.scss'],
    providers: [ MissionService, UserService ]
})
export class UserRolesComponent implements OnInit {
    data: Role[] = [];
    search = {
        name: ''
    };
    pageSize: number = 20;
    pageIndex: number = 1;
    total: number = 0;
    constructor(
        private $mission: MissionService,
        private $service: UserService,
        private $modal: NzModalService,
        private $router: Router
    ) {
        $mission.pageChangeHook.subscribe(page => {
            this.pageSize = page.pageSize;
            this.pageIndex = page.pageIndex;
            this.refreshRoles();
        });
    }
    ngOnInit() {
    }
    searchByField() {
        console.log(this.search);
        this.$service.getRolesByField(this.pageIndex, this.pageSize, this.search.name, result => {
            this.data = result.roles;
            this.total = result.total;
        });
    }

    modifyRole(role: Role) {
        this.$modal.info({
            title: '修改角色',
            content: '12/8版本不做要求'
        })
    }
    cancel() { }
    confirmDelete(role: Role) {
        console.log(role);
    }

    /**
     * 刷新列表
     */
    private refreshRoles() {
        this.$service.getRolesPagination(this.pageIndex, this.pageSize, result => {
            this.data = result.roles;
            this.total = result.total;
        });
    }
}
