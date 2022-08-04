import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConsultaRoutingModule} from './consulta-routing.module';
import {MovimentacaoDiariaComponent} from './movimentacao-diaria/movimentacao-diaria.component';
import {CoreModule} from "../../core/core.module";
import {ComponentsModule} from "../../shared/components/components.module";


@NgModule({
  declarations: [
    MovimentacaoDiariaComponent
  ],
  imports: [
    CommonModule,
    ConsultaRoutingModule,
    CoreModule,
    ComponentsModule
  ]
})
export class ConsultaModule {
}
