import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MissionService {
    // 定义数据模型
    private pageSource = new Subject<{ pageIndex: number, pageSize: number }>();

    // 用于接受数据变化
    pageChangeHook = this.pageSource.asObservable();

    // 此方法用于提交数据变化
    commitPageChange(page: { pageIndex: number, pageSize: number }) {
        this.pageSource.next(page);
    }
}
