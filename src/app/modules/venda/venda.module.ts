import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {VendaRoutingModule} from './venda-routing.module';
import {IncluirVendaComponent} from './incluir-venda/incluir-venda.component';
import {CoreModule} from "../../core/core.module";


@NgModule({
  declarations: [
    IncluirVendaComponent
  ],
  imports: [
    CommonModule,
    VendaRoutingModule,
    CoreModule
  ]
})
export class VendaModule {
}
