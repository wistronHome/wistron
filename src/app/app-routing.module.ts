import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CabinetComponent } from "./components/cabinet/cabinet.component"
import { RoomComponent } from "./components/room/room.component"
import { MachineComponent } from "./components/machine/machine.component"

const routes: Routes = [
    {
        path: '',
        redirectTo: 'capital',
        pathMatch: 'full'
    },
    {
        path: 'machine',
        component: MachineComponent
    },
    {
        path: 'machine/cabinet',
        component: CabinetComponent
    },
    {
        path: 'machine/room',
        component: RoomComponent
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
