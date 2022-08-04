import {Component, OnInit, Renderer2} from '@angular/core';
import {PessoaService} from "../../../shared/services/PessoaService";
import {PessoaEnderecoService} from "../../../shared/services/PessoaEnderecoService";
import {PessoaTelefoneService} from "../../../shared/services/PessoaTelefoneService";
import {PessoaEmailService} from "../../../shared/services/PessoaEmailService";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {IPessoaPost, IPessoaPut, IPessoaView} from "../../../shared/interface/IPessoaView";
import {IPessoaEnderecoViewList} from "../../../shared/interface/IPessoaEnderecoView";
import {IPessoaTelefoneViewList} from "../../../shared/interface/IPessoaTelefoneView";
import {IPessoaEmailViewList} from "../../../shared/interface/IPessoaEmailView";
import * as moment from 'moment';

@Component({
  selector: 'app-cadastrar-pessoa',
  templateUrl: './cadastrar-pessoa.component.html',
  styleUrls: ['./cadastrar-pessoa.component.scss']
})
export class CadastrarPessoaComponent implements OnInit {

  tiposPessoa: any[] = [
    {tipoPessoa: 'Pessoa Física', code: 'FISICA'},
    {tipoPessoa: 'Pessoa Jurídica', code: 'JURIDICA'}
  ];
  sexos: any[] = [
    {sexo: 'Masculino', code: 'MASCULINO'},
    {sexo: 'Feminino', code: 'FEMININO'}
  ];
  situacao: any[] = [
    {nome: 'Ativo', code: 'ATIVO'},
    {nome: 'Inativo', code: 'INATIVO'}
  ];

  tipoPessoaSelecionado = {tipoPessoa: 'Pessoa Física', code: 'FISICA'};
  cpfCnpj = '';
  inscricaoEstadual = '';
  nome = '';
  sexoSelecionado = {sexo: 'Selecione', code: 'MASCULINO'};
  dataNascimento?: Date;// | null = new Date();
  situacaoSelecionada = {nome: 'Ativo', code: 'ATIVO'};

  pessoa: IPessoaView = {} as IPessoaView;
  pessoaPost: IPessoaPost = {} as IPessoaPost;

  enderecos: IPessoaEnderecoViewList[] = [];
  telefones: IPessoaTelefoneViewList[] = [];
  emails: IPessoaEmailViewList[] = [];

  //dataDividida: string[] = [];

  idPessoaExistente!: number | null;

  constructor(
    private pessoaService: PessoaService,
    private enderecoService: PessoaEnderecoService,
    private telefoneService: PessoaTelefoneService,
    private emailService: PessoaEmailService,
    private rotas: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private renderer: Renderer2
  ) {

  }

  async ngOnInit(): Promise<void> {
    this.idPessoaExistente = this.activatedRoute.snapshot.paramMap.get('id') as number | null;

    if (this.idPessoaExistente) {
      await this.loadPessoa(+this.idPessoaExistente);
    }
  }

  adicionarEndereco($event: IPessoaEnderecoViewList[]): void {
    this.enderecos = $event;
  }

  adicionarTelefone($event: IPessoaTelefoneViewList[]): void {
    this.telefones = $event;
  }

  adicionarEmail($event: IPessoaEmailViewList[]): void {
    this.emails = $event;
  }

  async clickSalvar(): Promise<void> {
    const isPessoaFisica = this.tipoPessoaSelecionado.code === 'FISICA';

    const request = {
      nome: this.nome,
      dataNascimento: isPessoaFisica ? moment(this.dataNascimento).format('DD/MM/YYYY') : null,
      cpfCnpj: this.cpfCnpj,
      sexo: isPessoaFisica ? this.sexoSelecionado.code : null,
      situacao: this.situacaoSelecionada.code,
      inscricaoEstadual: !isPessoaFisica ? this.inscricaoEstadual : null,
      tipoPessoa: this.tipoPessoaSelecionado.code
    };

    try {
      const {success, data} = this.idPessoaExistente
        ? await this.pessoaService.editar(this.idPessoaExistente, request as IPessoaPut)
        : await this.pessoaService.salvar(request as IPessoaPost);

      if (!success) {
        throw new Error();
      }

      for (const endereco of this.enderecos) {
        await this.enderecoService.put(data.id, endereco);
      }

      for (const telefone of this.telefones) {
        await this.telefoneService.put(data.id, telefone);
      }

      for (const email of this.emails) {
        await this.emailService.put(data.id, email);
      }

      this.messageService.add({
        severity: 'success',
        summary: 'OK!',
        detail: 'Cliente salvo com sucesso.'
      });

      await this.rotas.navigate(['/pessoa/consultar-pessoas']);
    } catch (e) {
      console.log(e);

      this.messageService.add({
        severity: 'error',
        summary: 'Erro ao salvar',
        detail: 'Verifique o status do servidor.'
      });
    }
  }

  async loadPessoa(idPessoa: number): Promise<void> {
    this.pessoa = await this.pessoaService.buscar(idPessoa);

    const tipoPessoa = this.pessoa.inscricaoEstadual ? this.tiposPessoa[1] : this.tiposPessoa[0];
    const situacaoSelecionada = this.pessoa.situacao === 'ATIVO' ? this.situacao[0] : this.situacao[1];

    this.tipoPessoaSelecionado = tipoPessoa;
    this.cpfCnpj = this.pessoa.cpfCnpj;
    this.nome = this.pessoa.nome;
    this.situacaoSelecionada = situacaoSelecionada;

    if (tipoPessoa.code === 'FISICA') {
      this.sexoSelecionado = this.pessoa.sexo === 'MASCULINO' ? this.sexos[0] : this.sexos[1];
      this.dataNascimento = moment(this.pessoa.dataNascimento, 'DD/MM/YYYY').toDate();
    } else if (tipoPessoa.code === 'JURIDICA') {
      this.inscricaoEstadual = this.pessoa.inscricaoEstadual || '';
    }
  }

  async clickCancelar(): Promise<void> {
    await this.rotas.navigate(['/pessoa/consultar-pessoas']);
  }

  limparCampos(): void {
    this.tipoPessoaSelecionado = this.tiposPessoa[0];
    this.cpfCnpj = '';
    this.inscricaoEstadual = '';
    this.nome = '';
    this.sexoSelecionado = {sexo: 'Selecione', code: ''};
    this.dataNascimento = null!;
    this.situacaoSelecionada = {nome: 'Ativo', code: 'ATIVO'};
  }

  verificaPessoaFisica(): boolean {
    return this.tipoPessoaSelecionado.code !== 'FISICA';
  }

  verificaPessoaJuridica(): boolean {
    return this.tipoPessoaSelecionado.code !== 'JURIDICA';
  }


}
