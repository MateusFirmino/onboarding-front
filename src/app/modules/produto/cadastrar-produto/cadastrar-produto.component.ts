import {Component, OnInit} from '@angular/core';
import {IProdutoPost, IProdutoView} from "../../../shared/interface/IProdutoView";
import {ProdutoService} from "../../../shared/services/ProdutoService";
import {CategoriaService} from "../../../shared/services/CategoriaService";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ICategoriaSelect} from "../../../shared/interface/ICategoriaView";

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.scss']
})
export class CadastrarProdutoComponent implements OnInit {


  categoriasProduto: ICategoriaSelect[] = [];
  situacoes: any[] = [
    {nome: 'Ativo', code: 'ATIVO'},
    {nome: 'Inativo', code: 'INATIVO'}
  ];
  tiposProduto: any[] = [
    {nome: 'Unidade', code: 'UNIDADE'},
    {nome: 'Caixa', code: 'CAIXA'},
    {nome: 'Peso (Kg)', code: 'PESO'},
  ];

  categoriaProdutoSelecionado!: ICategoriaSelect | undefined;
  nome = '';
  situacaoSelecionada = {nome: 'Ativo', code: 'ATIVO'};
  tipoProdutoSelecionado: any = null;
  quantidade = 0;
  valor = 0;
  valorDesconto = 0;
  situacao = '';

  idProdutoExistente!: number | null;

  produto: IProdutoView = {} as IProdutoView;
  novoProduto: IProdutoPost = {} as IProdutoPost;

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private rotas: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {

  }

  async ngOnInit(): Promise<void> {

    this.idProdutoExistente = await this.activatedRoute.snapshot.paramMap.get('id') as number | null;

    this.categoriasProduto = await this.categoriaService.buscarSelect();


    if (this.idProdutoExistente) {
      await this.loadProduto(+this.idProdutoExistente);
    }
  }

  async clickSalvar(): Promise<void> {
    this.novoProduto = {
      categoria: {
        id: this.categoriaProdutoSelecionado?.id
      },
      nome: this.nome,
      tipoProduto: this.tipoProdutoSelecionado.code,
      qtde: this.quantidade,
      valor: this.valor,
      valorDesconto: this.valorDesconto,
      usuarioCadastro: 'Admin', // usuário fixo
      situacao: this.situacaoSelecionada.code
    };

    try {
      if (this.idProdutoExistente) {
        const idProdutoExistenteNumber = +this.idProdutoExistente;
        await this.produtoService
          .alterar(idProdutoExistenteNumber, this.novoProduto);

        this.messageService.add({
          severity: 'success',
          summary: 'OK!',
          detail: 'Produto alterado com sucesso.',
          life: 3000
        });
      } else {
        await this.produtoService.salvar(this.novoProduto);

        setTimeout(
          () => this.messageService.add({
            severity: 'success',
            summary: 'OK!',
            detail: 'Produto salvo com sucesso.',
            life: 3000
          }),
          1000
        )
      }

      await this.rotas.navigate(['/produtos/consultar-produtos']);
    } catch (e) {
      console.log(e);

      if (this.idProdutoExistente) {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao alterar',
          detail: 'Verifique o status do servidor.'
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro ao salvar',
          detail: 'Verifique o status do servidor.'
        });
      }
    }
  }

  async loadProduto(idProduto: number): Promise<void> {
    this.produto = await this.produtoService.buscar(idProduto);


    const situacaoSelecionada = this.produto.situacao === 'ATIVO' ?
      this.situacoes[0] : this.situacoes[1];
    const tipoProdutoSelecionado = this.tiposProduto
      .find(tipo => tipo.code === this.produto.tipoProduto);
    const categoriaProdutoSelecionado = this.categoriasProduto.find(
      categoria => categoria.id === this.produto.categoria.id
    )
    this.nome = this.produto.nome;
    this.situacaoSelecionada = situacaoSelecionada;
    this.tipoProdutoSelecionado = tipoProdutoSelecionado;
    this.quantidade = this.produto.qtde;
    this.valor = this.produto.valor;
    this.valorDesconto = this.produto.valorDesconto;
    this.categoriaProdutoSelecionado = categoriaProdutoSelecionado;
  }

  async clickCancelar(): Promise<void> {
    await this.rotas.navigate(['/produtos/consultar-produtos']);
  }

  verificaValor(): boolean {
    if (!this.valor) {
      this.valorDesconto = 0;
      return true;
    }
    return false;
  }

  verificaValorDesconto(): void {
    if (this.valor < this.valorDesconto) {
      this.valorDesconto = 0;

      this.messageService.add({
        severity: 'info',
        summary: 'Desconto inválido',
        detail: 'Desconto maior que valor do produto.'
      });
    }
  }
}
