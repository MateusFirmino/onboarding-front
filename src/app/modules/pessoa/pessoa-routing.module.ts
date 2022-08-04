import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConsultarPessoaComponent} from "./consultar-pessoa/consultar-pessoa.component";
import {CadastrarPessoaComponent} from "./cadastrar-pessoa/cadastrar-pessoa.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'consultar-pessoas' },
  { path: 'consultar-pessoas', component: ConsultarPessoaComponent },
  { path: 'cadastrar-pessoas', component: CadastrarPessoaComponent },
  { path: 'cadastrar-pessoas/:id', component: CadastrarPessoaComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PessoaRoutingModule {}

