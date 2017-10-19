import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CabinetComponent } from "./components/cabinet/cabinet.component"
import { RoomComponent } from "./components/room/room.component"
import { MachineComponent } from "./components/machine/machine.component";
import { UserManagerComponent } from './components/user/user-manager/user-manager.component'
import { TranslateComponent } from './components/css3/translate/translate.component'

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
        path: 'css/translate',
        component: TranslateComponent
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
