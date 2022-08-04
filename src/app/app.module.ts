import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MenubarModule} from "primeng/menubar";
import {PanelModule} from "primeng/panel";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {TableModule} from "primeng/table";
import {ToolbarModule} from 'primeng/toolbar';
import {MegaMenuModule} from 'primeng/megamenu';
import {ToastModule} from "primeng/toast";
import {CardModule} from "primeng/card";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {ComponentsModule} from "./shared/components/components.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MenubarModule,
    PanelModule,
    BrowserAnimationsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    ToolbarModule,
    MegaMenuModule,
    ToastModule,
    CardModule,
    RippleModule,
    ComponentsModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
