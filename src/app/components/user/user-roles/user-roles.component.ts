import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/Models'
import { UserService } from '../user.service'
import { MissionService } from '../../../mission-store/mission.service'
@Component({
    selector: 'app-user-roles',
    templateUrl: './user-roles.component.html',
    styleUrls: ['./user-roles.component.scss'],
    providers: [ MissionService, UserService ]
})
export class UserRolesComponent implements OnInit {
    data: Role[] = [];
    pageSize: number = 10;
    pageIndex: number = 1;
    total: number = 1;
    constructor(
        private $mission: MissionService,
        private $service: UserService
    ) {
        $mission.pageChangeHook.subscribe(page => {
            this.pageSize = page.pageSize;
            this.pageIndex = page.pageIndex;
            this.$service.getRolePagination( this.pageIndex, this.pageSize ).then(result => {
                this.data = result.roles;
                this.total = result.total;
            });
        });
    }

    ngOnInit() {
        this.$service.getRolePagination( this.pageIndex, this.pageSize ).then(result => {
            this.data = result.roles;
            this.total = result.total;
        });
    }

}
