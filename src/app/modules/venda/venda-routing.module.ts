import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IncluirVendaComponent} from "./incluir-venda/incluir-venda.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'incluir-vendas'},
  {path: 'incluir-vendas', component: IncluirVendaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendaRoutingModule {
}
