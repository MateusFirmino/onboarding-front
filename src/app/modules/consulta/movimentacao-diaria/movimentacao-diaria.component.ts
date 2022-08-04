import {Component, OnInit} from '@angular/core';
import {IPessoaCombo, IPessoaView} from "../../../shared/interface/IPessoaView";
import {IBuscarProduto, IProdutoView} from "../../../shared/interface/IProdutoView";
import {IClienteVendaView} from "../../../shared/interface/IClienteVendaView";
import {ItensMovimentacao, IVendaItemView} from "../../../shared/interface/IVendaItemView";
import {PessoaService} from "../../../shared/services/PessoaService";
import {ProdutoService} from "../../../shared/services/ProdutoService";
import {ClienteVendaService} from "../../../shared/services/ClienteVendaService";
import {VendaItemService} from "../../../shared/services/VendaItemService";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-movimentacao-diaria',
  templateUrl: './movimentacao-diaria.component.html',
  styleUrls: ['./movimentacao-diaria.component.scss']
})
export class MovimentacaoDiariaComponent implements OnInit {

  clientes: IPessoaCombo[] = [];
  produtos: IBuscarProduto[] = [];
  vendas: IClienteVendaView[] = [];
  vendaItens: IVendaItemView[] = [];
  situacoes: any[] = [
    {nome: 'Todos', code: 0},
    {nome: 'Aberto', code: 1},
    {nome: 'Concluído', code: 2},
    {nome: 'Cancelado', code: 3}
  ];

  clientesFiltrados: IPessoaCombo[] = [];
  produtosFiltrados: IBuscarProduto[] = [];

  clienteSelecionado: IPessoaView = {} as IPessoaView;
  produtoSelecionado: IProdutoView = {} as IProdutoView;
  situacaoSelecionada: any = {nome: 'Todos', code: 0};

  dataInicial: string = '';
  dataFinal: string = '';
  valorInicial!: number;
  valorFinal!: number;
  vendedor = '';

  itensMovimentacao: ItensMovimentacao[] = [];

  constructor(
    private pessoaService: PessoaService,
    private produtoService: ProdutoService,
    private clienteVendaService: ClienteVendaService,
    private vendaItemService: VendaItemService,
    private messageService: MessageService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.clientes = await this.pessoaService.buscarSelect();
    this.produtos = await this.produtoService.buscarProduto();

    await this.autocompleteCliente('');
    await this.autocompleteProduto('');

    // await this.clickPesquisar('');
  }

  clickImprimir() {
    if (this.validaData(this.dataInicial) && this.validaData(this.dataFinal)) {
      this.vendaItemService.getMovimentacao(this.formataData(this.dataInicial), this.formataData(this.dataFinal),
        this.valorInicial, this.valorFinal, this.produtoSelecionado.id, this.clienteSelecionado.id, true).subscribe((res: any) => {
        const file = new Blob([res], {
          type: res.type
        });

        const blob = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = blob;
        link.download = 'rel_movimentacaodiaria.pdf';
        link.click();
        window.URL.revokeObjectURL(blob);
        link.remove();
      })
    }
  }

  validaData(data: string) {
    if (data != '' && data != null) {
      if (parseInt(data.substr(0, 2)) < 1 || parseInt(data.substr(0, 2)) > 31 ||
        parseInt(data.substr(3, 2)) < 1 || parseInt(data.substr(3, 2)) > 12 ||
        parseInt(data.substr(6, 4)) < 1900 || parseInt(data.substr(6, 4)) > 2022) {
        this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Informe uma data válida.'});
        setTimeout(() => {
          this.messageService.clear()
        }, 2000);
        return false;
      }
    }
    return true;
  }

  formataData(data: string) {
    let dataformatada = '';
    if (data != '' && data != null) {
      dataformatada = data.substr(0, 2) + '/' + data.substr(3, 2) + '/' + data.substr(6, 4);
    }
    return dataformatada;
  }


  async clickPesquisar(dataInicial: string, dataFinal: string, valorInicial: number, valorFinal: number, idProduto: number, idPessoa: number)
    : Promise<void> {

    this.produtoSelecionado.id = idProduto;
    this.clienteSelecionado.id = idPessoa;
    const {
      data,
      success
    } = await this.vendaItemService.listar(dataInicial, dataFinal, valorInicial, valorFinal, idProduto, idPessoa);
    if (success) {
      this.itensMovimentacao = data.content;
    }

  }


  async clickLimpar(): Promise<void> {
    this.clienteSelecionado = {} as IPessoaView;
    this.produtoSelecionado = {} as IProdutoView;
    this.situacaoSelecionada = {nome: 'Todos', code: 0};

    this.dataInicial = '';
    this.dataFinal = '';
    this.valorInicial = 0;
    this.valorFinal = 0;
    this.vendedor = '';

    this.limparLista();
  }

  limparLista(): void {
    this.itensMovimentacao = [];
  }

  autocompleteProduto(query: any): void {
    this.produtosFiltrados = [];

    for (const produto of this.produtos) {
      if (produto.nome.toLowerCase().includes(query.toLowerCase())) {
        this.produtosFiltrados.push(produto);
      }
    }
  }

  autocompleteCliente(query: any): void {
    this.clientesFiltrados = [];

    for (const pessoa of this.clientes) {
      if (pessoa.nome.toLowerCase().includes(query.toLowerCase())) {
        this.clientesFiltrados.push(pessoa);
      }
    }
  }
}
