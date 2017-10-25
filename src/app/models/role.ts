export class Role {
    private _roleId: number;
    private _roleName: string;
    private _roleDescribe: string;
    private _roleUsers: string;
    private _checked: boolean = false;

    constructor() {}

    set roleId(param: number) {
        this._roleId = param;
    }
    get roleId(): number {
        return this._roleId;
    }

    set roleName(param: string) {
        this._roleName = param;
    }
    get roleName(): string {
        return this._roleName;
    }

    set roleDescribe(param: string) {
        this._roleDescribe = param;
    }
    get roleDescribe(): string {
        return this._roleDescribe;
    }

    set roleUsers(param: string) {
        this._roleUsers = param;
    }
    get roleUsers(): string {
        return this._roleUsers;
    }

    set checked(flag: boolean) {
        this._checked = flag;
    }
    get checked(): boolean {
        return this._checked;
    }
}
