import { Component, OnInit, NgModule, Input, Output, EventEmitter } from '@angular/core';

@NgModule({
    imports:      [],
    declarations: [ CreateRoomModalComponent ],
    bootstrap:    [ CreateRoomModalComponent ]
})

@Component({
    selector: 'app-create-room-modal',
    templateUrl: './create-room-modal.component.html',
    styleUrls: ['./create-room-modal.component.scss']
})
export class CreateRoomModalComponent implements OnInit {
    @Input() isVisible: boolean;
    @Output() onVoted = new EventEmitter<boolean>();
    roomUpload = null;
    constructor() { }

    ngOnInit() {
    }

    /**
     * 通知父组件
     */
    closeModal() {
        this.onVoted.emit(false);
    }

    /**
     *
     */
    beforeUpload() {
        let file = document.getElementById('fileUpload')['files'][0];
        let _this = this;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ev => {
            _this.roomUpload = ev.target['result'];
        }
    }
}
