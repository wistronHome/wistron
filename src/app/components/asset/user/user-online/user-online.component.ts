import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models'
import { UserService } from '../user.service'
import { MissionService } from '../../../../mission-store/mission.service'
@Component({
    selector: 'app-user-online',
    templateUrl: './user-online.component.html',
    styleUrls: ['./user-online.component.scss'],
    providers: [ MissionService, UserService ]
})
export class UserOnlineComponent implements OnInit {
    data: User[] = [];
    search = {
        code: '',
        name: ''
    };
    pageSize: number = 20;
    pageIndex: number = 1;
    total: number = 1;
    constructor(
        private $mission: MissionService,
        private $service: UserService
    ) {
        // 订阅页码改变事件
        $mission.pageChangeHook.subscribe(page => {
            this.pageSize = page.pageSize;
            this.pageIndex = page.pageIndex;
            this.$service.getOnlineUserPagination( this.pageSize, this.pageIndex ,result => {
                console.log(result);
            });
        });
    }

    ngOnInit() {
        // this.$service.getOnlineUserPagination(this.pageSize, this.pageIndex, result => {
        //     console.log(result);
        //     // this.data = result.users;
        //     // this.total = result.total;
        // });
    }
    searchByField() {
        console.log(this.search);
    }

    confirmOffline(user: User) {
        this.$service.offline(user.userName, result => {
            if (result.ok) {
                alert('下线成功~');
            }
        })
    }
    cancel() {

    }
}
