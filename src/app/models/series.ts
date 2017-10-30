import {Brand} from "./brand";

export class Series {
    public id: number;
    public name: string;
    public level: number;
    public code: string;
    public description: string;
    public parentBsm: Brand;
    public parentId: number;

    constructor() {
        this.parentBsm = new Brand();
    }
}
