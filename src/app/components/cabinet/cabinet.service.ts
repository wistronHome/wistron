import { Injectable } from '@angular/core';

@Injectable()
export class CabinetService {

    constructor() { }

    public getGriff(offsetX: number = 20, width: number = 20, num: number = 4): object[] {
        let tmp = [];
        for (let i = 0; i < 8; i++) {
            let item = {
                x: offsetX + i * width,
                y: 0,
                w: width,
                h: num * 17
            }
            tmp.push(item);
        }
        return tmp;
    }
}
