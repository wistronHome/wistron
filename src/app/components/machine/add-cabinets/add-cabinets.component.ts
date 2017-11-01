import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-add-cabinets',
    templateUrl: './add-cabinets.component.html',
    styleUrls: ['./add-cabinets.component.scss']
})
export class AddCabinetsComponent implements OnInit {
    @Input()
    isAddVisible: boolean;
    @Output()
    close = new EventEmitter<boolean>();

    constructor() {
    }

    ngOnInit() {
    }

    closeModal() {
        this.close.emit(false)
    }



}
