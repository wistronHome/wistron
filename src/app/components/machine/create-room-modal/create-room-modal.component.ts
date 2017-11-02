import {Component, OnInit, NgModule, Input, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import { HttpHeaders } from '@angular/common/http';
@NgModule({
    imports: [],
    declarations: [CreateRoomModalComponent],
    bootstrap: [CreateRoomModalComponent]
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
    file: any;
    constructor(private http: HttpClient,
                private $message: NzMessageService) {
    }
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
        this.file = document.getElementById('fileUpload')['files'][0];
        let _this = this;
        console.log(file);
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ev => {
            _this.roomUpload = ev.target['result'];
        };
    }
    saveRoom() {
        let body = new FormData();
        body.append('roomName', this.roomName);
        body.append('roomMaxCabinet', '50');
        body.append('roomLength', this.roomLength);
        body.append('pic', this.file );
        this.http.post('/itm/rooms/addRoom', body, {
            headers: new HttpHeaders().set('Accept', 'multipart/form-data;text/plain, */*'),
        }).subscribe(data => {
            console.log(data);
            if (data['code'] === 0) {
                this.$message.create('error', data['msg']);
                this.onVoted.emit(false);
            } else {
                this.$message.create('error', data['msg']);
            }
        });

    }

    _console(){

    }
}
