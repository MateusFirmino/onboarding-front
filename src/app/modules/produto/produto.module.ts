import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoRoutingModule } from './produto-routing.module';
import { ConsultarProdutoComponent } from './consultar-produto/consultar-produto.component';
import { CadastrarProdutoComponent } from './cadastrar-produto/cadastrar-produto.component';
import {CoreModule} from "../../core/core.module";


@NgModule({
  declarations: [
    ConsultarProdutoComponent,
    CadastrarProdutoComponent
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    CoreModule
  ]
})
export class ProdutoModule { }
