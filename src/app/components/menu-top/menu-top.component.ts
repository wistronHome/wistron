import { Component, OnInit, NgModule } from '@angular/core';
import { Router } from '@angular/router'
import { MenuTopService } from './menu-top.service';

@NgModule({
    imports:      [  ],
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
        private $service: MenuTopService,
        private $router: Router
    ) { }

    ngOnInit() {
        this.menuData = this.$service.mockMenu();
    }
    navigate(item) {
        if (item.items.length === 0) {
            this.$router.navigate([item.router]);
        }
    }
}
