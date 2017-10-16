import { Pipe, PipeTransform } from '@angular/core';

const STATE = {
    A: '启用',
    B: '停用'
}

@Pipe({
  name: 'userState'
})
export class UserStatePipe implements PipeTransform {

    transform(value: number, reverse: string): string {
        if (reverse === 'reverse') {
            return value === 1 ? STATE.B : STATE.A;
        }
        return value === 1 ? STATE.A : STATE.B;
    }

}
