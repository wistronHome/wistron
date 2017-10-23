export class Role {
    private _id: string;
    private _name: string;
    private _desc: string;
    private _checked: boolean = false;

    constructor() {}

    set id(id: string) {
        this._id = id;
    }
    get id(): string {
        return this._id;
    }

    set name(name: string) {
        this._name = name;
    }
    get name(): string {
        return this._name;
    }

    set desc(desc: string) {
        this._desc = desc;
    }
    get desc(): string {
        return this._desc;
    }

    set checked(flag: boolean) {
        this._checked = flag;
    }
    get checked(): boolean {
        return this._checked;
    }
}
