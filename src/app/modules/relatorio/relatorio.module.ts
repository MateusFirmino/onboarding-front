import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RelatorioRoutingModule} from './relatorio-routing.module';
import {RelatorioClientesComponent} from './relatorio-clientes/relatorio-clientes.component';
import {RelatorioProdutosComponent} from './relatorio-produtos/relatorio-produtos.component';
import {RelatorioVendasComponent} from './relatorio-vendas/relatorio-vendas.component';
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ToastModule} from "primeng/toast";
import {PanelModule} from "primeng/panel";
import {CoreModule} from "../../core/core.module";


@NgModule({
  declarations: [
    RelatorioClientesComponent,
    RelatorioProdutosComponent,
    RelatorioVendasComponent
  ],
  imports: [
    CommonModule,
    RelatorioRoutingModule,
    ConfirmPopupModule,
    ToastModule,
    PanelModule,
    CoreModule
  ]
})
export class RelatorioModule {
}
