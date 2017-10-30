import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoopInterceptor } from './noop-interceptor'
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { CabinetComponent } from './components/cabinet/cabinet.component';
import { RoomComponent } from './components/room/room.component';
import { AppRoutingModule } from "./app-routing.module";
import { MachineComponent } from './components/machine/machine.component';
import { CreateRoomModalComponent } from './components/machine/create-room-modal/create-room-modal.component';
import { UserManagerComponent } from './components/asset/user/user-manager/user-manager.component';
import { UserStatePipe } from './pipes/user-state.pipe';
import { UserRolePipe } from './pipes/user-role.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MenuTopComponent } from './components/menu-top/menu-top.component';
import { AlarmBadgeComponent } from './components/alarm-badge/alarm-badge.component';
import { RotatePipe } from './pipes/rotate.pipe';
import { UserOnlineComponent } from './components/asset/user/user-online/user-online.component';
import { UserRolesComponent } from './components/asset/user/user-roles/user-roles.component';
import { RoleDetailComponent } from './components/asset/user/role-detail/role-detail.component';
import { AssetComponent } from './components/asset/asset.component';
import { AlarmPipe } from './pipes/alarm.pipe';
import { RockComponent } from "./components/asset/servicer/rock/rock.component";
import { RockDetailComponent } from "./components/asset/servicer/rock/rock-detail/rock-detail.component";
import { LoginComponent } from './components/login/login.component'

import { BrandComponent } from "./components/asset/manager/brand/brand.component";
import { SeriesComponent } from "./components/asset/manager/series/series.component";
import { VersionComponent } from "./components/asset/manager/version/version.component";
import { BladeComponent } from './components/asset/servicer/blade/blade.component'

@NgModule({
    declarations: [
        AppComponent,
        CabinetComponent,
        RoomComponent,
        MachineComponent,
        CreateRoomModalComponent,
        UserManagerComponent,
        UserStatePipe,
        UserRolePipe,
        PaginationComponent,
        MenuTopComponent,
        AlarmBadgeComponent,
        RotatePipe,
        UserOnlineComponent,
        UserRolesComponent,
        RoleDetailComponent,
        RockDetailComponent,
        AssetComponent,
        RockComponent,
        AlarmPipe,
        BrandComponent,
        SeriesComponent,
        LoginComponent,
        VersionComponent,
        BladeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgZorroAntdModule.forRoot(),
        // 路由模块最后导入。
        AppRoutingModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NoopInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
