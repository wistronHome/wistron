import { Component, OnInit, NgModule } from '@angular/core';

@NgModule({
    imports:      [],
    declarations: [ AlarmBadgeComponent ],
    bootstrap:    [ AlarmBadgeComponent ]
})

@Component({
    selector: 'app-alarm-badge',
    templateUrl: './alarm-badge.component.html',
    styleUrls: ['./alarm-badge.component.scss']
})
export class AlarmBadgeComponent implements OnInit {
    total: number = 0;
    error: number = 0;
    warning: number = 0;
    info: number = 0;
    primary: number = 0;
    success: number = 0;
    constructor() { }

    ngOnInit() {
        setInterval(() => {
            this.error = this.getRandom(10);
            this.warning = this.getRandom(30);
            this.info = this.getRandom(20);
            this.primary = this.getRandom(50);
            this.success = this.getRandom(80);
            this.total = this.error + this.warning + this.info + this.primary + this.success;
        }, 5000);
    }

    private getRandom(limit) {
        return Math.floor(Math.random() * limit);
    }
}
