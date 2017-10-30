import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Result } from "../../../../../models/result";

@Injectable()
export class RockDetailService {
    constructor(
        private $http: HttpClient
    ) {  }

    /**
     *
     * @param {number} roomId
     * @param callback
     */
    public getRockDetailById(roomId: number, callback) {
        this.$http.get(`/itm/bsserver/${roomId}`).subscribe((result: Result) => {
            console.log(result);
            if (result.code === 0) {
                callback(result.data);
            }
        });
    }

}
