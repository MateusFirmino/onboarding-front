import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { ConsultarCategoriaComponent } from './consultar-categoria/consultar-categoria.component';
import {CoreModule} from "../../core/core.module";
import {ComponentsModule} from "../../shared/components/components.module";
import { CadastrarCategoriaComponent } from './cadastrar-categoria/cadastrar-categoria.component';


@NgModule({
  declarations: [
    ConsultarCategoriaComponent,
    CadastrarCategoriaComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ComponentsModule,
    CategoriaRoutingModule
  ]
})
export class CategoriaModule { }
