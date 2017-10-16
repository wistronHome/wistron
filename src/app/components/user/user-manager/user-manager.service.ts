import { Injectable } from '@angular/core';
import { User } from '../../../models/User';

@Injectable()
export class UserManagerService {

    constructor() { }

    public getAllUser(): User[] {
        let tmp: User[] = [];
        for (let i = 0; i < 489; i++) {
            tmp.push(this.createUser());
        }
        return tmp;
    }

    private createUser(): User {
        let user = new User();
        let _random = this.getRandomColor();
        let _phone = this.getPhone();
        user.id = 'id' + _random;
        user.name = 'name' + _random;
        user.code = _random;
        user.state = this.getState(2);
        user.email =  _phone + '@163.com';
        user.phone = _phone;
        user.role = this.getState(4);
        return user;
    }

    private getRandomColor(): string {
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    private getPhone() {
        return parseInt('139' +  (Math.floor(Math.random() * 89999999) + 10000000));
    }
    private getState(limit) {
        return Math.ceil(Math.random() * limit);
    }
}
