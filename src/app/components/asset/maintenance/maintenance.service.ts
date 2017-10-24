import { Injectable } from '@angular/core';
import { Asset, Utils } from '../../../models'
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
    ];
    assets: Asset[] = [];
    constructor() {
        for (let i = 0; i < 78; i ++) {
            this.assets.push(this.mockAsset());
        }
    }

    public getBrand() {
        return this.brand;
    }

    public getRoom() {
        return this.room;
    }

    public getAssetPagination(pageIndex: number, pageSize: number, search = { code: '', name: '', state: 0 }): Promise<{ assets: Asset[], total: number }> {
        let _assets: Asset[] = [];
        for (let i = pageSize * (pageIndex - 1); i < pageSize * pageIndex && i < this.assets.length; i++) {
            _assets.push(this.assets[i]);
        }
        return Promise.resolve({ assets: _assets, total: this.assets.length});
    }

    private mockAsset() {
        let asset = new Asset();
        let _random = Utils.getRandomColor();
        asset.id = 'id' + _random;
        asset.name = 'name' + _random;
        asset.number = _random;
        asset.room = 'room' + _random;
        asset.state = Utils.getState(3);
        asset.belong = '机房1';
        asset.position = Utils.getState(42) + '_U';
        asset.duty = '张三';
        asset.model = 'model' + _random;
        asset.alarm = Utils.getState(5);
        asset.checked = false;
        return asset;
    }
}
