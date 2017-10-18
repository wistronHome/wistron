import { Component, OnInit, NgModule } from '@angular/core';
import { MenuTopService } from './menu-top.service'

@NgModule({
    imports:      [],
    declarations: [ MenuTopComponent ],
    bootstrap:    [ MenuTopComponent ]
})

@Component({
    selector: 'app-menu-top',
    templateUrl: './menu-top.component.html',
    styleUrls: ['./menu-top.component.scss'],
    providers: [ MenuTopService ]
})
export class MenuTopComponent implements OnInit {
    menuData;
    constructor(
        private $service: MenuTopService
    ) { }

    ngOnInit() {
        this.menuData = this.$service.mockMenu();
    }

}
