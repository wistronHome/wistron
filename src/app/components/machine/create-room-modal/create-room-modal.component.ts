import { Component, OnInit, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';

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
    roomName = '';
    roomWith = '';
    roomLength = '';
    roomImage = '';
    constructor( private http: HttpClient,
                 private $message: NzMessageService) { }

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
        };
    }
    saveRoom() {
        const body = {roomName: this.roomName, roomMaxCabinet: '50', roomLength: this.roomLength, roomWith: this.roomWith,
            roomImage: '', roomRemark: ''};
        this.http.post('/itm/rooms/addRoom', body).subscribe(data => {
            console.log(data);
            if (data['code'] === 0) {
                this.$message.create('error', data['msg']);
                this.onVoted.emit(false);
            }else {
                this.$message.create('error', data['msg']);
                alert('网络异常，请重试');
            }
        });
    }
}
