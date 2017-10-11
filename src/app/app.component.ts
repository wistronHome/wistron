import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'app';
    isCollapsed: boolean = true;

    ngOnInit() {

    }

    toggleCollapsed() {
        this.isCollapsed = !this.isCollapsed;
    }
}
