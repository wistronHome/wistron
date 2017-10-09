import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { CabinetComponent } from './components/cabinet/cabinet.component';
import { RoomComponent } from './components/room/room.component';
import { AppRoutingModule } from "./app-routing.module";
import { MachineComponent } from './components/machine/machine.component'

@NgModule({
    declarations: [
        AppComponent,
        CabinetComponent,
        RoomComponent,
        MachineComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        NgZorroAntdModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
