import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CabinetComponent } from "./components/cabinet/cabinet.component"
import { RoomComponent } from "./components/room/room.component"
import { MachineComponent } from "./components/machine/machine.component";
import { UserManagerComponent } from './components/user/user-manager/user-manager.component'
import { UserOnlineComponent } from './components/user/user-online/user-online.component'
import { UserRolesComponent } from './components/user/user-roles/user-roles.component'
import { RoleDetailComponent } from './components/user/role-detail/role-detail.component'
import { AssetComponent } from './components/asset/asset.component'
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
        path: 'asset',
        component: AssetComponent,
        children: [
            {
                path: 'user',
                children: [
                    {
                        path: 'manager',
                        component: UserManagerComponent
                    },
                    {
                        path: 'online',
                        component: UserOnlineComponent
                    },
                    {
                        path: 'roles',
                        component: UserRolesComponent
                    },
                    {
                        path: 'role/:id',
                        component: RoleDetailComponent
                    }
                ]
            },
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
