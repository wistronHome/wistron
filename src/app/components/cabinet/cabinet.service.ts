import { Injectable } from '@angular/core';
import { AmendUtil } from "./amend-util";
import * as TYPES from "./types";


const IMAGE = {
    A: './assets/image/cabinet-a-1.png',
    B: './assets/image/griff-200-4.png',
    C: './assets/image/cabinet-c-3.png',
    D: './assets/image/server-22-4.png',
    E: './assets/image/griff-200-10.png'
};
let data = [
    {x: 0, y: 42.5, image: "./assets/image/cabinet-c-3.png", type: TYPES.CABINET},
    {x: 0, y: -255, image: "./assets/image/griff-200-4.png", type: TYPES.GRIFF}
];


@Injectable()
export class CabinetService {
    constructor() { }

    public getGriff1() {

    }

    public getGriff(offsetX: number = 11, width: number = 22, num: number = 4, row: number = 1): object[] {
        let tmp = [];
        for (let i = 0; i < 8 * row; i++) {
            let item = {
                x: offsetX + (i % 8) * width,
                y: Math.floor(i / 8) * num * 17,
                w: width,
                h: num * 17
            };
            tmp.push(item);
        }
        return tmp;
    }

    public getAllNode() {
        data[1]['griffData'] = this.getGriff();
        return data;
    }

    public getNodeInfoById(id: string) {

    }
}
