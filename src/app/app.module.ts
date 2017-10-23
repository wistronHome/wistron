import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { CabinetComponent } from './components/cabinet/cabinet.component';
import { RoomComponent } from './components/room/room.component';
import { AppRoutingModule } from "./app-routing.module";
import { MachineComponent } from './components/machine/machine.component';
import { CreateRoomModalComponent } from './components/machine/create-room-modal/create-room-modal.component';
import { UserManagerComponent } from './components/user/user-manager/user-manager.component';
import { UserStatePipe } from './pipes/user-state.pipe';
import { UserRolePipe } from './pipes/user-role.pipe';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MenuTopComponent } from './components/menu-top/menu-top.component';
import { AlarmBadgeComponent } from './components/alarm-badge/alarm-badge.component';
import { RotatePipe } from './pipes/rotate.pipe';
import { UserOnlineComponent } from './components/user/user-online/user-online.component';
import { UserRolesComponent } from './components/user/user-roles/user-roles.component';
import { RoleDetailComponent } from './components/user/role-detail/role-detail.component';
import { AssetComponent } from './components/asset/asset.component';
// import { CreateRoomComponentComponent } from './components/machine/create-room-component/create-room-component.component'

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
        AssetComponent

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
    bootstrap: [AppComponent]
})
export class AppModule { }
