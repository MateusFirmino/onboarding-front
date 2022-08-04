import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  IPessoaTelefoneView,
  IPessoaTelefoneViewList,
  ITipoTelefone
} from "../../../shared/interface/IPessoaTelefoneView";
import {PessoaTelefoneService} from "../../../shared/services/PessoaTelefoneService";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-telefone-pessoa',
  templateUrl: './telefone-pessoa.component.html',
  styleUrls: ['./telefone-pessoa.component.scss']
})
export class TelefonePessoaComponent implements OnInit {
  tiposTelefone: ITipoTelefone[] = [
    {tipoTelefone: 'Celular', code: 1},
    {tipoTelefone: 'Residencial', code: 2},
    {tipoTelefone: 'Contato', code: 3}
  ];
  opcoesPadrao: any[] = [
    {nome: 'Sim', key: 'S'},
    {nome: 'Não', key: 'N'}
  ];

  numero = '';
  opcaoPadraoSelecionada: any = null;
  tipoTelefoneSelecionado = {
    tipoTelefone: 'Selecione',
    code: 0
  } as ITipoTelefone;

  idPessoaExistente = -1;
  editandoExistente = -1;
  indexOfTelefone: any;
  editando = false;

  telefones: IPessoaTelefoneView[] = [];


  @Output() adicionarTelefoneEvent = new EventEmitter<IPessoaTelefoneViewList[]>();

  constructor(
    private telefoneService: PessoaTelefoneService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.idPessoaExistente = +this.activatedRoute.snapshot.paramMap.get('id')!;

    if (!!this.idPessoaExistente) {
      this.loadTelefone();
    }
  }

  ngOnInit(): void {
  }

  limparCampos(): void {
    this.numero = '';
    this.opcaoPadraoSelecionada = null;
    this.tipoTelefoneSelecionado = {
      tipoTelefone: 'Selecione',
      code: 0
    } as ITipoTelefone;

    this.editandoExistente = -1;
    this.indexOfTelefone = null;
    this.editando = false;
  }

  camposPreenchidos(): boolean {
    return !(!this.numero ||
      !this.opcaoPadraoSelecionada ||
      this.tipoTelefoneSelecionado.code === 0);

  }

  async loadTelefone(): Promise<void> {
    await this.telefoneService
      .listar(this.idPessoaExistente)
      .then(response => this.telefones = response.content);

    for (const telefone of this.telefones) {
      delete telefone.pessoa;
    }
  }

  async clickAdicionar(): Promise<void> {
    const telefone = {
      telefone: this.numero,
      tipoTelefone: this.tipoTelefoneSelecionado.code,
      telefonePadrao: this.opcaoPadraoSelecionada.key
    } as any;

    if (this.editandoExistente) {
      telefone.id = +this.editandoExistente;
    }

    if (this.editando) {
      this.telefones[this.indexOfTelefone] = telefone;
    } else {
      this.telefones.push(telefone);
    }

    this.adicionarTelefoneEvent.emit(this.telefones);

    this.limparCampos();
  }

  clickEditar(telefone: IPessoaTelefoneView): void {
    this.editando = true;
    this.indexOfTelefone = this.telefones.indexOf(telefone);

    this.numero = telefone.telefone;
    this.opcaoPadraoSelecionada = telefone.telefonePadrao === 'S' ?
      this.opcoesPadrao[0] : this.opcoesPadrao[1];
    this.tipoTelefoneSelecionado = telefone.tipoTelefone === 1 ?
      this.tiposTelefone[0] : this.tiposTelefone[1];

    if (telefone.id) {
      this.editandoExistente = telefone.id;
    }
  }

  async clickExcluir(event: Event, telefone: IPessoaTelefoneView): Promise<void> {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Deseja realmente excluir este telefone?',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Não',
      acceptLabel: 'Sim',
      accept: async () => {
        if (telefone.id) {
          try {
            await this.telefoneService
              .delete(this.idPessoaExistente, telefone.id);

            this.telefones = this.telefones
              .filter(telefoneItem => (telefoneItem.id !== telefone.id));

            this.messageService.add({
              severity: 'success',
              summary: 'OK!',
              detail: 'Telefone excluído com sucesso.'
            });
          } catch (e) {
            console.log(e);

            this.messageService.add({
              severity: 'success',
              summary: 'OK!',
              detail: 'Telefone excluído com sucesso'
            });
          }
        } else {
          this.telefones = this.telefones.filter(telefoneItem => !(
            telefoneItem.telefone === telefone.telefone &&
            telefoneItem.telefonePadrao === telefone.telefonePadrao &&
            telefoneItem.tipoTelefone === telefone.tipoTelefone
          ));
        }
      },
      reject: () => {
        // reject action
      }
    });
  }

  verificaTipoTelefone(telefone: string): string {
    return telefone === '1' ? 'Residencial' : telefone === '2' ? 'Celular' : 'Contato';
  }

}
