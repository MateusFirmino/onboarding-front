import {Component, OnInit} from '@angular/core';
import {IPessoaCombo, IPessoaView} from "../../../shared/interface/IPessoaView";
import {IBuscarProduto, IProdutoView} from "../../../shared/interface/IProdutoView";
import {PessoaService} from "../../../shared/services/PessoaService";
import {ProdutoService} from "../../../shared/services/ProdutoService";
import {MessageService} from "primeng/api";
import {IVendaItemViewList, IVendaItemViewSave} from "../../../shared/interface/IVendaItemView";
import {VendaItemService} from "../../../shared/services/VendaItemService";
import {ClienteVendaService} from "../../../shared/services/ClienteVendaService";
import * as moment from "moment";

@Component({
  selector: 'app-incluir-venda',
  templateUrl: './incluir-venda.component.html',
  styleUrls: ['./incluir-venda.component.scss']
})
export class IncluirVendaComponent implements OnInit {

  valores: any = [
    {nome: 'Total Bruto', valor: 0, valorFormatado: this.converteParaReal(0)},
    {nome: 'Desconto', valor: 0, valorFormatado: this.converteParaReal(0)},
    {nome: 'Total', valor: 0, valorFormatado: this.converteParaReal(0)},
  ];
  clientes: IPessoaCombo[] = [];
  produtos: IBuscarProduto[] = [];

  clientesFiltrados: IPessoaCombo[] = [];
  produtosFiltrados: IBuscarProduto[] = [];

  clienteSelecionado: IPessoaView = {} as IPessoaView;
  produtoSelecionado: IProdutoView = {} as IProdutoView;

  data = moment(new Date()).format('DD/MM/YYYY');
  vendedor = 'Admin';
  observacao = '';
  quantidade?: number = undefined;
  quantidadeMaxima = 0;

  vendaItens: IVendaItemViewSave[] = [];
  vendaItensList: IVendaItemViewList[] = [];

  dataDividida: string[] = [];

  constructor(
    private pessoaService: PessoaService,
    private produtoService: ProdutoService,
    private vendaItemService: VendaItemService,
    private clienteVendaService: ClienteVendaService,
    private messageService: MessageService
  ) {

  }

  async ngOnInit(): Promise<void> {
    this.clientes = await this.pessoaService.buscarSelect();
    this.produtos = await this.produtoService.buscarProduto();

    await this.autocompleteCliente('');
    await this.autocompleteProduto('');

  }

  limparCampos(): void {
    this.limparCamposProduto();

    // this.pessoaService
    //   .listar().then(response => this.clientes = response.content);
    // this.produtoService
    //   .listar().then(response => this.produtos = response.content);

    this.vendedor = 'Admin';
    this.clienteSelecionado = {} as IPessoaView;
    this.observacao = '';
    this.quantidadeMaxima = 0;

    this.valores[0].valor = 0;
    this.valores[1].valor = 0;
    this.valores[2].valor = 0;

    this.valores[0].valorFormatado = this.converteParaReal(0);
    this.valores[1].valorFormatado = this.converteParaReal(0);
    this.valores[2].valorFormatado = this.converteParaReal(0);

    this.vendaItens = [];
    this.vendaItensList = [];
  }

  limparCamposProduto(): void {
    this.produtoSelecionado = {} as IProdutoView;
    this.quantidade = undefined;
  }

  clickAdicionar(): void {
    if (
      this.produtoSelecionado &&
      !Object.keys(this.produtoSelecionado).length
    ) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Adição não permitida',
        detail: 'Selecione um produto.'
      });
      return;
    }

    if (!this.quantidade) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Quantidade inválida',
        detail: 'Quantidade maior que a disponível para o produto.'
      });
      return;
    }

    if (
      this.quantidade &&
      this.quantidade > this.produtoSelecionado.qtde
    ) {
      this.quantidade = this.produtoSelecionado.qtde;
      this.messageService.add({
        severity: 'info',
        summary: 'Quantidade inválida',
        detail: 'Quantidade maior que a disponível para o produto.'
      });
      return;
    }

    const valor = (this.produtoSelecionado.valor * this.quantidade);
    const desconto = (this.produtoSelecionado.valorDesconto * this.quantidade);
    const valorTotal = valor - desconto;

    // const tipoProduto = ['Un', 'Cx', 'Kg'];

    this.vendaItens.push({
      id: this.produtoSelecionado.id,
      nome: this.produtoSelecionado.nome,
      qtde: this.quantidade,
      valor: this.produtoSelecionado.valor,
      valorDesconto: this.produtoSelecionado.valorDesconto,
      precoTotal: valorTotal
    });

    this.valores[0].valor += valor;
    this.valores[1].valor += desconto;
    this.valores[2].valor += valorTotal;

    this.valores[0].valorFormatado =
      this.converteParaReal(this.valores[0].valor);
    this.valores[1].valorFormatado =
      this.converteParaReal(this.valores[1].valor);
    this.valores[2].valorFormatado =
      this.converteParaReal(this.valores[2].valor);

    this.vendaItensList.push({
      idProduto: this.produtoSelecionado.id,
      quantidade: this.quantidade,
      valor,
      desconto: desconto,
      subtotal: valorTotal,
    });

    this.produtos.forEach((produto, indice) => {
      if (produto.id === this.produtoSelecionado.id) {
        this.produtos[indice].qtde -= (this.quantidade || 0);
      }
    });

    this.limparCamposProduto();
  }

  async clickSalvar(): Promise<void> {
    const novaVenda = {
      idPessoa: this.clienteSelecionado.id,
      usuarioVenda: this.vendedor,
      valorTotal: this.valores[2].valor,
      descontoVenda: this.valores[1].valor,
      situacao: 'CONCLUIDO',
      observacao: this.observacao,
      itens: this.vendaItensList
    };

    try {
      const clienteVenda = await this.clienteVendaService.salvar(novaVenda);

      // for (const item of this.vendaItensList) {
      //   item.clienteVenda = clienteVenda.id;
      //
      //   await this.vendaItemService.salvar(item);
      // }

      this.messageService.add({
        severity: 'success',
        summary: 'OK!',
        detail: 'Venda salva com sucesso.'
      });

      this.limparCampos();
    } catch (e) {
      console.log(e);

      this.messageService.add({
        severity: 'error',
        summary: 'Erro ao salvar',
        detail: 'Verifique o status do servidor.'
      });
    }
  }

  clickCancelar(): void {
    this.limparCampos();
  }

  converteParaReal(valor: number): string {
    return valor.toLocaleString(
      'pt-BR',
      {minimumFractionDigits: 2, style: 'currency', currency: 'BRL'}
    );
  }

  verificaProdutoSelecionado(): boolean {
    return (
      (!(this.produtoSelecionado && Object.keys(this.produtoSelecionado).length))
    );
  }

  verificaQuantidade(): void {
    if (
      this.quantidade &&
      this.quantidade > this.produtoSelecionado.qtde
    ) {
      this.quantidade = this.produtoSelecionado.qtde;

      this.messageService.add({
        severity: 'info',
        summary: 'Quantidade inválida',
        detail: 'Quantidade maior que a disponível para o produto.'
      });
    }
  }

  autocompleteProduto(event: any): void {
    const query = event.query;
    this.produtosFiltrados = [];

    for (const produto of this.produtos) {
      if (produto.nome.toLowerCase().includes(query.toLowerCase())) {
        this.produtosFiltrados.push(produto);
      }
    }
  }

  autocompleteCliente(event: any): void {
    const query = event.query;
    this.clientesFiltrados = [];

    for (const pessoa of this.clientes) {
      if (pessoa.nome.toLowerCase().includes(query.toLowerCase())) {
        this.clientesFiltrados.push(pessoa);
      }
    }
  }

}
