import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {RoomSerService} from "../../room/room-ser.service";

@Component({
    selector: 'app-add-cabinets',
    templateUrl: './add-cabinets.component.html',
    styleUrls: ['./add-cabinets.component.scss'],
    providers: [RoomSerService]
})
export class AddCabinetsComponent implements OnInit {
    @Input()
    isAddVisible: boolean;
    @Input()
    roomName = '';
    @Input()
    roomId = '';
    @Output()
    close = new EventEmitter<boolean>();
    cabinetType: any;
    cabinetCol: number;
    cabinetRow: number;
    selectedCabinetType: any;
    cabinetname: any;

    constructor(private RoomSerService: RoomSerService) {
    }

    ngOnInit() {
        this.RoomSerService.getCabinetType(e => {
            this.cabinetType = e.data;
            console.log(this.cabinetType);
        })
    }

    closeModal() {
        this.close.emit(false)
    }

    saveRoom() {
     let arr = [];
        for (let j = 0; j < this.cabinetRow; j++) {


            for (let i = 0; i < this.cabinetCol; i++) {
                let element = {
                    cabinetId: '',
                    cabinetName: "",
                    cabinetMaxU: 32,
                    usedU: "",
                    cabinetHeight: 20,
                    cabinetWidth: 0,
                    cabinetImage: "",
                    cabinetType: "",
                    cabinetX: 200,
                    cabinetY: 290,
                    cabinetRemark: "",
                    roomId: ''
                };
                element.cabinetName = this.cabinetname + (i + j * this.cabinetRow);
                element.usedU = '';
                element.cabinetId = '';
                element.cabinetMaxU = 32;
                element.usedU = '';
                element.cabinetHeight = this.cabinetType[this.selectedCabinetType].cabinetTypeHeight / 20;
                element.cabinetWidth = this.cabinetType[this.selectedCabinetType].cabinetTypeWidth / 20;
                element.cabinetImage = this.cabinetType[this.selectedCabinetType].cabinetTypeImage;
                element.cabinetType = '';
                element.cabinetX = j * (this.cabinetType[this.selectedCabinetType].cabinetTypeWidth / 20 + 20) + 120;
                element.cabinetY = i * (this.cabinetType[this.selectedCabinetType].cabinetTypeHeight / 20 + 20 ) + 120;
                element.cabinetRemark = '';
                element.roomId = this.roomId;
                arr.push(element)
            }
        }
        let obj = {};
        obj['roomId'] = this.roomId;
        obj['cabinetSet'] = arr;
        this.RoomSerService.saveRoomInfo(obj, e => {

        });
        this.close.emit(false)
        console.log(obj);
        console.log(this.cabinetType[this.selectedCabinetType]);
    }

}
