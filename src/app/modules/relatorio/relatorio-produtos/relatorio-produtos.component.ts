import {Component, OnInit} from '@angular/core';
import {CategoriaService} from "../../../shared/services/CategoriaService";
import {ProdutoService} from "../../../shared/services/ProdutoService";
import {ICategoriaSelect} from "../../../shared/interface/ICategoriaView";
import {IBuscarProduto, IProdutoView} from "../../../shared/interface/IProdutoView";
import {IValorView} from "../../../shared/interface/IValorView";

@Component({
  selector: 'app-relatorio-produtos',
  templateUrl: './relatorio-produtos.component.html',
  styleUrls: ['./relatorio-produtos.component.scss']
})
export class RelatorioProdutosComponent implements OnInit {
  categorias: ICategoriaSelect[] = [];
  produtos: IBuscarProduto[] = [];

  ativo: IValorView;
  inativo: IValorView;
  situacoes: IValorView[];
  tipoSituacao = '';

  produtosFiltrados: IBuscarProduto[] = [];
  produtoSelecionado: IProdutoView = {} as IProdutoView;

  categoriaFiltrada: ICategoriaSelect[] = [];
  categoriaSelecionada: ICategoriaSelect = {} as ICategoriaSelect;

  categoria = '';
  produto = '';


  itens: any[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService,
  ) {
    this.ativo = {nome: 'ATIVO', valor: 'ATIVO'};
    this.inativo = {nome: 'INATIVO', valor: 'INATIVO'};
    this.situacoes = [this.ativo, this.inativo];
  }

  async ngOnInit(): Promise<void> {
    this.categorias = await this.categoriaService.buscarSelect();
    this.produtos = await this.produtoService.buscarProduto();

    await this.autocompleteCategoria('');
    await this.autocompleteProduto('');

  }


  async clickLimpar(): Promise<void> {
    this.categoria = '';
    this.produto = '';
    this.tipoSituacao = '';

    // this.limparLista();
  }

  autocompleteProduto(query: any): void {
    this.produtosFiltrados = [];

    for (const produto of this.produtos) {
      if (produto.nome.toLowerCase().includes(query.toLowerCase())) {
        this.produtosFiltrados.push(produto);
      }
    }
  }

  autocompleteCategoria(query: any): void {
    this.categoriaFiltrada = [];

    for (const categoria of this.categorias) {
      if (categoria.nome.toLowerCase().includes(query.toLowerCase())) {
        this.categoriaFiltrada.push(categoria);
      }
    }
  }

  async clickImprimir(): Promise<void> {
    this.produtoService.getRelatorio(this.categoriaSelecionada.id, this.produtoSelecionado.nome, this.tipoSituacao, true).subscribe((res: any) => {
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
