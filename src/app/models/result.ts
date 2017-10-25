export class Result {
    private _code: number;
    private _data: any;
    private _msg: string;

    set code(param: number) {
        this._code = param;
    }
    get code(): number {
        return this._code;
    }

    set data(param: any) {
        this._data = param;
    }
    get data(): any {
        return this._data;
    }

    set msg(param: string) {
        this._msg = param;
    }
    get msg(): string {
        return this._msg;
    }
}
