
export class User {
    private _id: string;
    private _name: string;
    private _code: string;
    private _state: number;
    private _phone: number;
    private _email: string;
    private _role: number;
    private _checked: boolean = false;
    private _password: string;
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

    set code(code: string) {
        this._code = code;
    }
    get code(): string {
        return this._code;
    }

    set state(state: number) {
        this._state = state;
    }
    get state(): number {
        return this._state;
    }

    set phone(phone: number) {
        this._phone = phone;
    }
    get phone(): number {
        return this._phone;
    }

    set email(email: string) {
        this._email = email;
    }
    get email(): string {
        return this._email;
    }

    set role(role: number) {
        this._role = role;
    }
    get role(): number {
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

}
