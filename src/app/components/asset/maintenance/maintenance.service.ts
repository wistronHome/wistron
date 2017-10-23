import { Injectable } from '@angular/core';

@Injectable()
export class MaintenanceService {
    brand = [
        {
            value: '0',
            label: '品牌1',
            children: [
                {
                    value: '0',
                    label: '系列1',
                    children: [
                        { value: '0', label: '型号1', isLeaf: true},
                        { value: '1', label: '型号2', isLeaf: true},
                        { value: '2', label: '型号3', isLeaf: true},
                        { value: '3', label: '型号4', isLeaf: true}
                    ],
                },
                {
                    value: '1',
                    label: '系列2',
                    children: [
                        { value: '0', label: '型号1', isLeaf: true},
                        { value: '1', label: '型号2', isLeaf: true},
                        { value: '2', label: '型号3', isLeaf: true},
                        { value: '3', label: '型号4', isLeaf: true}
                    ],
                }
            ]
        },
        {
            value: '1',
            label: '品牌2',
            children: [
                {
                    value: '0',
                    label: '系列1',
                    children: [
                        { value: '0', label: '型号1', isLeaf: true},
                        { value: '1', label: '型号2', isLeaf: true},
                        { value: '2', label: '型号3', isLeaf: true},
                        { value: '3', label: '型号4', isLeaf: true}
                    ],
                },
                {
                    value: '1',
                    label: '系列2',
                    children: [
                        { value: '0', label: '型号1', isLeaf: true},
                        { value: '1', label: '型号2', isLeaf: true},
                        { value: '2', label: '型号3', isLeaf: true},
                        { value: '3', label: '型号4', isLeaf: true}
                    ],
                }
            ]
        }
    ];
    room = [
        {
            value: '0',
            label: '机房1',
            children: [
                {
                    value: '0',
                    label: '机柜1',
                    children: [
                        { value: '0', label: '第12U', isLeaf: true },
                        { value: '1', label: '第21U', isLeaf: true },
                        { value: '2', label: '第42U', isLeaf: true },
                        { value: '3', label: '第9U', isLeaf: true }
                    ]
                },
                {
                    value: '1',
                    label: '机柜2',
                    children: [
                        { value: '0', label: '第12U', isLeaf: true },
                        { value: '1', label: '第21U', isLeaf: true },
                        { value: '2', label: '第42U', isLeaf: true },
                        { value: '3', label: '第9U', isLeaf: true }
                    ]
                },
                {
                    value: '2',
                    label: '机柜3',
                    children: [
                        { value: '0', label: '第12U', isLeaf: true },
                        { value: '1', label: '第21U', isLeaf: true },
                        { value: '2', label: '第42U', isLeaf: true },
                        { value: '3', label: '第9U', isLeaf: true }
                    ]
                }
            ]
        },
        {
            value: '1',
            label: '机房2',
            children: [
                {
                    value: '0',
                    label: '机柜1',
                    children: [
                        { value: '0', label: '第12U', isLeaf: true },
                        { value: '1', label: '第21U', isLeaf: true },
                        { value: '2', label: '第42U', isLeaf: true },
                        { value: '3', label: '第9U', isLeaf: true }
                    ]
                },
                {
                    value: '1',
                    label: '机柜2',
                    children: [
                        { value: '0', label: '第12U', isLeaf: true },
                        { value: '1', label: '第21U', isLeaf: true },
                        { value: '2', label: '第42U', isLeaf: true },
                        { value: '3', label: '第9U', isLeaf: true }
                    ]
                },
                {
                    value: '2',
                    label: '机柜3',
                    children: [
                        { value: '0', label: '第12U', isLeaf: true },
                        { value: '1', label: '第21U', isLeaf: true },
                        { value: '2', label: '第42U', isLeaf: true },
                        { value: '3', label: '第9U', isLeaf: true }
                    ]
                }
            ]
        },
        {
            value: '2',
            label: '机房3',
            children: [
                {
                    value: '0',
                    label: '机柜1',
                    children: [
                        { value: '0', label: '第12U', isLeaf: true },
                        { value: '1', label: '第21U', isLeaf: true },
                        { value: '2', label: '第42U', isLeaf: true },
                        { value: '3', label: '第9U', isLeaf: true }
                    ]
                },
                {
                    value: '1',
                    label: '机柜2',
                    children: [
                        { value: '0', label: '第12U', isLeaf: true },
                        { value: '1', label: '第21U', isLeaf: true },
                        { value: '2', label: '第42U', isLeaf: true },
                        { value: '3', label: '第9U', isLeaf: true }
                    ]
                },
                {
                    value: '2',
                    label: '机柜3',
                    children: [
                        { value: '0', label: '第12U', isLeaf: true },
                        { value: '1', label: '第21U', isLeaf: true },
                        { value: '2', label: '第42U', isLeaf: true },
                        { value: '3', label: '第9U', isLeaf: true }
                    ]
                }
            ]
        }
    ]
    constructor() { }

    public getBrand() {
        return this.brand;
    }

    public getRoom() {
        return this.room;
    }

}
