import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RelatorioVendasComponent} from "./relatorio-vendas/relatorio-vendas.component";
import {RelatorioProdutosComponent} from "./relatorio-produtos/relatorio-produtos.component";
import {RelatorioClientesComponent} from "./relatorio-clientes/relatorio-clientes.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'relatorio-venda'},
  {path: 'relatorio-venda', component: RelatorioVendasComponent},
  {path: 'relatorio-produtos', component: RelatorioProdutosComponent},
  {path: 'relatorio-clientes', component: RelatorioClientesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatorioRoutingModule {
}
