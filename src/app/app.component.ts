import { Component, OnInit } from '@angular/core';
import { MissionService } from './mission-store/mission.service'
import { User } from './models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ MissionService ]
})
export class AppComponent implements OnInit {
    title = 'app';
    isCollapsed: boolean = true;
    loginUser: User;

    constructor(
        private $mission: MissionService
    ) {
        $mission.loginStatusChangeHook.subscribe(user => {
            this.loginUser = user;
            console.log(this.loginUser);
        })
    }

    ngOnInit() {

    }

    toggleCollapsed() {
        this.isCollapsed = !this.isCollapsed;
    }
}
