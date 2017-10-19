import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CabinetComponent } from "./components/cabinet/cabinet.component"
import { RoomComponent } from "./components/room/room.component"
import { MachineComponent } from "./components/machine/machine.component";
import { UserManagerComponent } from './components/user/user-manager/user-manager.component'
import { TranslateComponent } from './components/css3/translate/translate.component'
import { PlaneComponent } from './components/css3/plane/plane.component'
import { ThreeDimensionalComponent } from './components/css3/three-dimensional/three-dimensional.component'
import { FilterComponent } from './components/css3/filter/filter.component'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'capital',
        pathMatch: 'full'
    },
    {
        path: 'machine',
        component: MachineComponent,
        children: [
            {
                path: 'cabinet/:id',
                component: CabinetComponent
            },
            {
                path: 'room/:id',
                component: RoomComponent
            }
        ]
    },
    {
        path: 'user/manager',
        component: UserManagerComponent
    },
    {
        path: 'css',
        children: [
            {
                path: 'translate',
                component: TranslateComponent
            },
            {
                path: 'plane',
                component: PlaneComponent
            },
            {
                path: 'three',
                component: ThreeDimensionalComponent
            },
            {
                path: 'filter',
                component: FilterComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}
