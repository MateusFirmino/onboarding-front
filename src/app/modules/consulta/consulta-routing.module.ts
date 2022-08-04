import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovimentacaoDiariaComponent} from "./movimentacao-diaria/movimentacao-diaria.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'movimentacao-diaria'},
  {path: 'movimentacao-diaria', component: MovimentacaoDiariaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultaRoutingModule {
}
