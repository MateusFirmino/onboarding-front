import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConsultarCategoriaComponent} from "./consultar-categoria/consultar-categoria.component";
import {CadastrarCategoriaComponent} from "./cadastrar-categoria/cadastrar-categoria.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'consultar-categorias' },
  { path: 'consultar-categorias', component: ConsultarCategoriaComponent },
  { path: 'cadastrar-categorias', component: CadastrarCategoriaComponent },
  { path: 'cadastrar-categorias/:id', component: CadastrarCategoriaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CategoriaRoutingModule {}
