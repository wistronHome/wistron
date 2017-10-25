
import { Role } from './role';

export class User {
    private _userId: number;
    private _userName: string;
    private _userStatus: string;
    private _userCode: number;
    private _phonenumber: number;
    private _email: string;
    private _role: Role;
    private _checked: boolean = false;
    private _password: string;
    private _passwordValidity: string;
    // private _lastLogin: Date;
    constructor() {
        this.checked = false;
        this.role = new Role();
    }

    set userId(param: number) {
        this._userId = param;
    }
    get userId(): number {
        return this._userId;
    }

    set userName(param: string) {
        this._userName = param;
    }
    get userName(): string {
        return this._userName;
    }

    set userCode(param: number) {
        this._userCode = param;
    }
    get userCode(): number {
        return this._userCode;
    }

    set userStatus(param: string) {
        this._userStatus = param;
    }
    get userStatus(): string {
        return this._userStatus;
    }

    set phonenumber(param: number) {
        this._phonenumber = param;
    }
    get phonenumber(): number {
        return this._phonenumber;
    }

    set email(email: string) {
        this._email = email;
    }
    get email(): string {
        return this._email;
    }

    set role(role: Role) {
        this._role = role;
    }
    get role(): Role {
        return this._role;
    }

    set checked(flag: boolean) {
        this._checked = flag;
    }
    get checked(): boolean {
        return this._checked;
    }

    set password(pwd: string) {
        this._password = pwd;
    }
    get password(): string {
        return this._password;
    }

    set passwordValidity(pwd: string) {
        this._passwordValidity = pwd;
    }
    get passwordValidity(): string {
        return this._passwordValidity;
    }
}
