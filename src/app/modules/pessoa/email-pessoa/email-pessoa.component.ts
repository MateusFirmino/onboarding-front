import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {PessoaEmailService} from "../../../shared/services/PessoaEmailService";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {IPessoaEmailView, IPessoaEmailViewList} from "../../../shared/interface/IPessoaEmailView";


@Component({
  selector: 'app-email-pessoa',
  templateUrl: './email-pessoa.component.html',
  styleUrls: ['./email-pessoa.component.scss']
})
export class EmailPessoaComponent implements OnInit {

  opcoesPadrao: any[] = [
    { nome: 'Sim', key: 'S' },
    { nome: 'Não', key: 'N' }
  ];

  email = '';
  opcaoPadraoSelecionada: any = null;

  idPessoaExistente = -1;
  editandoExistente = -1;
  indexOfEmail: any;
  editando = false;

  emails: IPessoaEmailView[] = [];
  emailsList: IPessoaEmailViewList[] = [];

  @Output() adicionarEmailEvent = new EventEmitter<IPessoaEmailViewList[]>();

  constructor(
    private emailService: PessoaEmailService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    this.idPessoaExistente = +this.activatedRoute.snapshot.paramMap.get('id')!;

    if (!!this.idPessoaExistente) {
      this.loadEmail();
    }
  }

  ngOnInit(): void { }

  limparCampos(): void {
    this.email = '';
    this.opcaoPadraoSelecionada = null;
  }

  camposPreenchidos(): boolean {
    if (
      !this.email ||
      !this.opcaoPadraoSelecionada
    ) {
      return false;
    }
    return true;
  }

  async loadEmail(): Promise<void> {
    await this.emailService
      .getAll(this.idPessoaExistente)
      .then(response => this.emailsList = response.content);

    for (const email of this.emailsList) {
      delete email.pessoa;
    }
  }

  async clickAdicionar(): Promise<void> {
    const email = {
      email: this.email,
      emailPadrao: this.opcaoPadraoSelecionada.key
    } as any;

    if (this.editandoExistente) {
      email.id = +this.editandoExistente;
    }

    if (this.editando) {
      this.emailsList[this.indexOfEmail] = email;
    }
    else {
      this.emailsList.push(email);
    }

    this.adicionarEmailEvent.emit(this.emailsList);

    this.limparCampos();
  }

  clickEditar(email: IPessoaEmailViewList): void {
    this.editando = true;
    this.indexOfEmail = this.emailsList.indexOf(email);

    this.email = email.email;
    this.opcaoPadraoSelecionada = (email.emailPadrao === 'S' ?
      this.opcoesPadrao[0] : this.opcoesPadrao[1]);

    if (email.id) {
      this.editandoExistente = email.id;
    }
  }

  async clickExcluir(event: Event, email: IPessoaEmailView): Promise<void> {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Deseja realmente excluir este e-mail?',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Não',
      acceptLabel: 'Sim',
      accept: async () => {
        if (email.id) {
          try {
            await this.emailService.delete(this.idPessoaExistente, email.id);

            this.emailsList = this.emailsList
              .filter(emailItem => (emailItem.id !== email.id));

            this.messageService.add({
              severity: 'success',
              summary: 'OK!',
              detail: 'E-mail excluído com sucesso.'
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
          this.emailsList = this.emailsList.filter(emailItem => !(
            emailItem.email === email.email &&
            emailItem.emailPadrao === email.emailPadrao
          ));
        }
      },
      reject: () => {
        // reject action
      }
    });
  }
}
