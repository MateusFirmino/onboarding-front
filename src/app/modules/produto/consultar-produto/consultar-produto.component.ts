import {Component, OnInit} from '@angular/core';
import {ICategoriaSelect, ICategoriaView} from "../../../shared/interface/ICategoriaView";
import {IProdutoView} from "../../../shared/interface/IProdutoView";
import {CategoriaService} from "../../../shared/services/CategoriaService";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {ProdutoService} from "../../../shared/services/ProdutoService";
import {IValorView} from "../../../shared/interface/IValorView";

@Component({
  selector: 'app-consultar-produto',
  templateUrl: './consultar-produto.component.html',
  styleUrls: ['./consultar-produto.component.scss']
})
export class ConsultarProdutoComponent implements OnInit {

  categoriasProduto: ICategoriaSelect[] = [];

  ativo: IValorView;
  inativo: IValorView;
  situacoes: IValorView[];

  categoriaProdutoSelecionado = {} as ICategoriaView;
  nome = '';
  categorias!: number | null;
  tipoSituacao = '';

  produtos: IProdutoView[] = [];

  primeiroRegistroPagina = 0;
  ultimoRegistroPagina = 10;
  totalRegistros = 0;
  rows = 10;
  buscar!: string;
  loading!: boolean;

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private rotas: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.ativo = {nome: 'ATIVO', valor: 'ATIVO'};
    this.inativo = {nome: 'INATIVO', valor: 'INATIVO'};
    this.situacoes = [this.ativo, this.inativo];
  }

  async ngOnInit(): Promise<void> {
    this.buscar = this.route.snapshot.paramMap.get('buscar')!;

    this.categoriasProduto = await this.categoriaService.buscarSelect();
    await this.carregarTabela(this.categoriaProdutoSelecionado.id, '', '');


  }

  next(): void {
    this.primeiroRegistroPagina = this.primeiroRegistroPagina + this.rows;
    this.ultimoRegistroPagina = this.ultimoRegistroPagina + this.rows;
  }

  prev(): void {
    this.primeiroRegistroPagina = this.primeiroRegistroPagina - this.rows;
    this.ultimoRegistroPagina = this.ultimoRegistroPagina - this.rows;
  }

  reset(): void {
    this.primeiroRegistroPagina = 0;
    this.ultimoRegistroPagina = this.rows;
  }

  isLastPage(): boolean {
    return this.produtos ?
      this.primeiroRegistroPagina === (this.produtos.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.produtos ? this.primeiroRegistroPagina === 0 : true;
  }


  clickAdicionar(): void {
    this.rotas.navigate(['/produtos/cadastrar-produtos']);
  }

  async clickLimpar(): Promise<void> {
    // this.loading = true;
    // const {data,success} = await this.produtoService
    //   .listar('', '', '');
    // if (success){
    //   this.produtos = data.content;
    // }
    // this.loading = false;
    //
    this.categoriaProdutoSelecionado = {} as ICategoriaView;
    this.nome = '';
    this.tipoSituacao = '';


  }

  async clickExcluir(event: Event, idProduto: number): Promise<void> {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Deseja realmente excluir este produto?',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Não',
      acceptLabel: 'Sim',
      accept: async () => {
        try {
          await this.produtoService.excluir(idProduto);
          this.produtos = this.produtos
            .filter(produto => (produto.id !== idProduto));

          this.messageService.add({
            severity: 'success',
            summary: 'OK!',
            detail: 'Produto excluído com sucesso.'
          });
        } catch (e) {
          console.log(e);

          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao excluir',
            detail: 'Verifique se o produto possui registros relacionados.'
          });
        }
      },
      reject: () => {
        // reject action
      }
    });
  }

  async carregarTabela(idCategoria: number, nome: string, situacao: string)
    : Promise<void> {
    this.loading = true;
    this.categoriaProdutoSelecionado.id = idCategoria;
    console.log(idCategoria);
    const {data, success} = await this.produtoService.listar(idCategoria, nome, situacao);
    if (success) {
      this.produtos = data.content;
    }
    this.loading = false;

  }

  verificarSituacao(situacao: string): string {
    return situacao === 'ATIVO' ? 'Ativo' : 'Inativo';
  }

  categoriaFilter(idCategoria: number){
     return this.categoriaService.buscar(idCategoria);
  }
}
