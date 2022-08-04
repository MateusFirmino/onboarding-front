import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {PessoaEnderecoService} from "../../../shared/services/PessoaEnderecoService";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {IPessoaEnderecoView, IPessoaEnderecoViewList} from "../../../shared/interface/IPessoaEnderecoView";

@Component({
  selector: 'app-endereco-pessoa',
  templateUrl: './endereco-pessoa.component.html',
  styleUrls: ['./endereco-pessoa.component.scss']
})
export class EnderecoPessoaComponent implements OnInit {

  opcoesPadrao: any[] = [
    { nome: 'Sim', key: 'S' },
    { nome: 'Não', key: 'N' }
  ];

  logradouro = '';
  numero = '';
  bairro = '';
  cep = '';
  cidade = '';
  uf = '';
  opcaoPadraoSelecionada: any = null;

  idPessoaExistente = -1;
  editandoExistente = -1;
  indexOfEndereco: any;
  editando = false;

  enderecosList: IPessoaEnderecoView[] = [];

  @Output() adicionarEnderecoEvent = new EventEmitter<IPessoaEnderecoViewList[]>();

  constructor(
    private enderecoService: PessoaEnderecoService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.idPessoaExistente = +this.activatedRoute.snapshot.paramMap.get('id')!;

    if (!!this.idPessoaExistente) {
      this.loadEndereco();
    }
  }

  ngOnInit(): void { }

  limparCampos(): void {
    this.logradouro = '';
    this.numero = '';
    this.bairro = '';
    this.cep = '';
    this.cidade = '';
    this.uf = '';
    this.opcaoPadraoSelecionada = null;

    this.editandoExistente = -1;
    this.indexOfEndereco = null;
    this.editando = false;
  }

  camposPreenchidos(): boolean {
    if (
      !this.logradouro ||
      !this.numero ||
      !this.bairro ||
      !this.cep ||
      !this.cidade ||
      !this.uf ||
      !this.opcaoPadraoSelecionada
    ) {
      return false;
    }
    return true;
  }

  async loadEndereco(): Promise<void> {
   const response = await this.enderecoService
      .getAll(this.idPessoaExistente);
    console.log(response.content as IPessoaEnderecoView[]);
    this.enderecosList = response.content;

    // for (const endereco of this.enderecosList) {
    //   delete endereco.pes
    // }
  }

  async clickAdicionar(): Promise<void> {
    const endereco = {
      logradouro: this.logradouro,
      numero: +this.numero,
      bairro: this.bairro,
      cep: this.cep,
      cidade: this.cidade,
      uf: this.uf,
      enderecoPadrao: this.opcaoPadraoSelecionada.key
    } as any;

    if (this.editandoExistente) {
      endereco.id = +this.editandoExistente;
    }

    if (this.editando) {
      this.enderecosList[this.indexOfEndereco] = endereco;
    } else {
      this.enderecosList.push(endereco);
    }

    this.adicionarEnderecoEvent.emit(this.enderecosList);

    this.limparCampos();
  }

  clickEditar(endereco: IPessoaEnderecoView): void {
    this.editando = true;
    this.indexOfEndereco = this.enderecosList.indexOf(endereco);

    this.logradouro = endereco.logradouro;
    this.numero = endereco.numero.toString();
    this.bairro = endereco.bairro;
    this.cep = endereco.cep;
    this.cidade = endereco.cidade;
    this.uf = endereco.uf;
    this.opcaoPadraoSelecionada = (endereco.enderecoPadrao === 'S' ?
      this.opcoesPadrao[0] : this.opcoesPadrao[1]);

    if (endereco.id) {
      this.editandoExistente = endereco.id;
    }
  }

  async clickExcluir(event: Event, endereco: IPessoaEnderecoView): Promise<void> {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Deseja realmente excluir este endereço?',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Não',
      acceptLabel: 'Sim',
      accept: async () => {
        if (endereco.id) {
          try {
            await this.enderecoService
              .delete(this.idPessoaExistente, endereco.id);

            this.enderecosList = this.enderecosList
              .filter(enderecoItem => (enderecoItem.id !== endereco.id));

            this.messageService.add({
              severity: 'success',
              summary: 'OK!',
              detail: 'Endereço excluído com sucesso.'
            });
          } catch (e) {
            console.log(e);

            this.messageService.add({
              severity: 'error',
              summary: 'Erro ao excluir',
              detail: 'Verifique o status do servidor.'
            });
          }
        } else {
          this.enderecosList = this.enderecosList.filter(enderecoItem => !(
            enderecoItem.logradouro === endereco.logradouro &&
            enderecoItem.numero === endereco.numero &&
            enderecoItem.bairro === endereco.bairro &&
            enderecoItem.cep === endereco.cep &&
            enderecoItem.cidade === endereco.cidade &&
            enderecoItem.uf === endereco.uf &&
            enderecoItem.enderecoPadrao === endereco.enderecoPadrao
          ));
        }
      },
      reject: () => {
        // reject action
      }
    });
  }
}
