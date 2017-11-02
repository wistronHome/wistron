import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CabinetComponent } from "./components/cabinet/cabinet.component"
import { RoomComponent } from "./components/room/room.component"
import { MachineComponent } from "./components/machine/machine.component";
import { UserManagerComponent } from './components/asset/user/user-manager/user-manager.component'
import { UserOnlineComponent } from './components/asset/user/user-online/user-online.component'
import { UserRolesComponent } from './components/asset/user/user-roles/user-roles.component'
import { RoleDetailComponent } from './components/asset/user/role-detail/role-detail.component'
import { RockDetailComponent } from "./components/asset/servicer/rock/rock-detail/rock-detail.component";
import { AssetComponent } from './components/asset/asset.component'
import { RockComponent } from './components/asset/servicer/rock/rock.component'
import { LoginComponent } from './components/login/login.component'

import { BrandComponent } from "./components/asset/manager/brand/brand.component";

import { AuthGuardService } from './guard/auth-guard.service'
import { SeriesComponent } from "./components/asset/manager/series/series.component";
import { VersionComponent } from "./components/asset/manager/version/version.component";
import { BladeComponent } from './components/asset/servicer/blade/blade.component'
import { BladeDetailComponent } from "./components/asset/servicer/blade/blade.detail/blade-detail.component";
import { DeviceComponent } from "./components/asset/servicer/device/device.component";
import {RepwdComponent} from "./components/user/repwd/repwd.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
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
            {
                path: 'servicer',
                children: [
                    { path: 'rock', component: RockComponent },
                    { path: 'rock/:id', component: RockDetailComponent },
                    { path: 'blade', component: BladeComponent },
                    { path: 'blade/:id', component: BladeDetailComponent },
                    { path: 'device', component: DeviceComponent }
                ]
            },
            {
                path: 'manager',
                children: [
                    { path: 'brand', component: BrandComponent },
                    { path: 'series', component: SeriesComponent },
                    { path: 'version', component: VersionComponent }
                ]
            }
        ]
    },
    {
        path: 'user',
        children: [
            { path: 'repwd', component: RepwdComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [ AuthGuardService ]
})

export class AppRoutingModule {}
