import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PessoaRoutingModule } from './pessoa-routing.module';
import {ConsultarPessoaComponent} from "./consultar-pessoa/consultar-pessoa.component";
import {TableModule} from "primeng/table";
import {PaginatorModule} from "primeng/paginator";
import {ToastModule} from "primeng/toast";
import {PanelModule} from "primeng/panel";
import {CoreModule} from "../../core/core.module";
import {RippleModule} from "primeng/ripple";
import {CadastrarPessoaComponent} from "./cadastrar-pessoa/cadastrar-pessoa.component";
import { EmailPessoaComponent } from './email-pessoa/email-pessoa.component';
import { TelefonePessoaComponent } from './telefone-pessoa/telefone-pessoa.component';
import { EnderecoPessoaComponent } from './endereco-pessoa/endereco-pessoa.component';


@NgModule({
  declarations: [
    CadastrarPessoaComponent,
    ConsultarPessoaComponent,
    EmailPessoaComponent,
    TelefonePessoaComponent,
    EnderecoPessoaComponent
  ],
  imports: [
    CommonModule,
    PessoaRoutingModule,
    TableModule,
    PaginatorModule,
    ToastModule,
    PanelModule,
    CoreModule,
    RippleModule
  ]
})
export class PessoaModule { }
