import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from "./home/home.component";
import {CardModule} from "primeng/card";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ToastModule} from "primeng/toast";
import {PanelModule} from "primeng/panel";
import {CoreModule} from "../../core/core.module";


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CardModule,
    ConfirmPopupModule,
    ToastModule,
    PanelModule,
    CoreModule
  ]
})
export class HomeModule { }
