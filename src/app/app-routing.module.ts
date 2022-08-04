import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'onboarding'},
  {path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
  {path: 'pessoa', loadChildren: () => import('./modules/pessoa/pessoa.module').then(m => m.PessoaModule)},
  {path: 'categorias', loadChildren: () => import('./modules/categoria/categoria.module').then(m => m.CategoriaModule)},
  {path: 'produtos', loadChildren: () => import('./modules/produto/produto.module').then(m => m.ProdutoModule)},
  {path: 'venda', loadChildren: () => import('./modules/venda/venda.module').then(m => m.VendaModule)},
  {path: 'consulta', loadChildren: () => import('./modules/consulta/consulta.module').then(m => m.ConsultaModule)},
  {path: 'relatorio', loadChildren: () => import('./modules/relatorio/relatorio.module').then(m => m.RelatorioModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
