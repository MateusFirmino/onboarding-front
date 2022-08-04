import {Component, OnInit} from '@angular/core';
import {IPessoaView} from "../../../shared/interface/IPessoaView";
import {IValorView} from "../../../shared/interface/IValorView";
import {PessoaService} from "../../../shared/services/PessoaService";
import {MensagemService} from "../../../shared/services/mensagem/Mensagem.service";
import {ActivatedRoute} from "@angular/router";
import {IPage} from "../../../shared/interface/page/IPage";

@Component({
  selector: 'app-consultar-pessoa',
  templateUrl: './consultar-pessoa.component.html',
  styleUrls: ['./consultar-pessoa.component.scss']
})
export class ConsultarPessoaComponent implements OnInit {
  pessoasPage!: IPage<IPessoaView>;
  pessoas: IPessoaView[] = [];

  ativo: IValorView;
  inativo: IValorView;
  situacoes: IValorView[];

  pessoaFisica: IValorView;
  pessoaJuridica: IValorView;
  tipos: IValorView[];


  tipoPessoa = '';
  nomePessoa = '';
  tipoSituacao = '';

  loading!: boolean;

  buscar!: string;

  constructor(private pessoaService: PessoaService,
              private mensagemService: MensagemService,
              private route: ActivatedRoute) {
    this.ativo = {nome: 'ATIVO', valor: 'ATIVO'};
    this.inativo = {nome: 'INATIVO', valor: 'INATIVO'};
    this.situacoes = [this.ativo, this.inativo];

    this.pessoaFisica = {nome: 'Pessoa Física', valor: 'FISICA'};
    this.pessoaJuridica = {nome: 'Pessoa Jurídica', valor: 'JURIDICA'};
    this.tipos = [this.pessoaFisica, this.pessoaJuridica];
  }

  async ngOnInit(): Promise<void> {
    this.buscar = this.route.snapshot.paramMap.get('buscar')!;


    await this.carregarTabela('', '', '');

  }

  async excluirPessoa(id: number) {
    this.pessoaService.excluir(id).then(sucesso => {
      this.mensagemService.showSuccess('Pessoa deletada com sucesso!');
      this.carregarTabela('', '', '');
    }).catch((err) => {
      this.mensagemService.showWarn(err.error.erro);
    });
  }

  async carregarTabela(nome: string, tipoPessoa: string, situacao: string): Promise<void> {
    this.loading = true;
    const {data, success} = await this.pessoaService.listar(nome, tipoPessoa, situacao);
    if (success) {
      this.pessoas = data.content;
    }
    this.loading = false;
  }

  limpar(): void {
    this.nomePessoa = '';
    this.tipoPessoa = '';
    this.tipoSituacao = '';
  }

  verificaTipoPessoa(cpfCnpj: string): string {
    const CPF_LENGTH = 11;
    const cnpjCpfFormatado = cpfCnpj.replace(/\D/g, '');

    if (cnpjCpfFormatado.length === CPF_LENGTH) {
      return cnpjCpfFormatado.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3-\$4');
    }

    return cnpjCpfFormatado.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3/\$4-\$5');
  }

}
