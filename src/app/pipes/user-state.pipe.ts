import { Pipe, PipeTransform } from '@angular/core';

const STATE = {
    A: '启用',
    B: '停用'
}

@Pipe({
  name: 'userState'
})
export class UserStatePipe implements PipeTransform {

    transform(value: string, reverse: string): string {
        if (reverse === 'reverse') {
            return value === '0' ? STATE.B : STATE.A;
        }
        return value === '0' ? STATE.A : STATE.B;
    }

}
