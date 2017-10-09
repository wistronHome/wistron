import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-machine',
  templateUrl: './machine.component.html',
  styleUrls: ['./machine.component.scss']
})
export class MachineComponent implements OnInit {

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
    }
    open(ev) {
        console.log('asfes');
        ev.stopPropagation();
    }
}
