import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConsultarProdutoComponent} from "./consultar-produto/consultar-produto.component";
import {CadastrarProdutoComponent} from "./cadastrar-produto/cadastrar-produto.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'consultar-produtos' },
  { path: 'consultar-produtos', component: ConsultarProdutoComponent },
  { path: 'cadastrar-produtos', component: CadastrarProdutoComponent },
  { path: 'cadastrar-produtos/:id', component: CadastrarProdutoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
