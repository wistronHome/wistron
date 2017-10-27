import { Component, OnInit } from '@angular/core'
const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
            isLeaf: true
        }],
    }, {
        value: 'ningbo',
        label: 'Ningbo',
        isLeaf: true
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            isLeaf: true
        }],
    }],
}];

@Component({
    selector: 'app-rock-detail',
    templateUrl: './rock-detail.component.html',
    styleUrls: [ './rock-detail.component.scss' ],
})
export class RockDetailComponent implements OnInit {
    style = {
        'background': '#f7f7f7',
        'border-radius': '4px',
        'margin-bottom': '24px',
        'border': '0px'
    };
    constructor() { }

    ngOnInit() {
    }

    _options = options;

    /* _value: any[] = ['zhejiang', 'hangzhou', 'xihu']; */
    /* or like this: */
    _value: any[] = [{
        value: 'zhejiang',
        label: 'Zhejiang'
    }, {
        value: 'hangzhou',
        label: 'Hangzhou'
    }, {
        value: 'xihu',
        label: 'West Lake'
    }];

    _console(value) {
        console.log(value);
    }

}
