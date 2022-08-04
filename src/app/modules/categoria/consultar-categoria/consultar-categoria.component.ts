import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {CategoriaService} from "../../../shared/services/CategoriaService";
import {ICategoriaView} from "../../../shared/interface/ICategoriaView";
import {IValorView} from "../../../shared/interface/IValorView";
import {IPage} from "../../../shared/interface/page/IPage";

@Component({
  selector: 'app-consultar-categoria',
  templateUrl: './consultar-categoria.component.html',
  styleUrls: ['./consultar-categoria.component.scss']
})
export class ConsultarCategoriaComponent implements OnInit {

  categoriasPage!: IPage<ICategoriaView>;
  categorias: ICategoriaView[] = [];

  ativo: IValorView;
  inativo: IValorView;
  situacoes: IValorView[];

  nome = '';
  tipoSituacao = '';

  loading!: boolean;
  buscar!: string;

  primeiroRegistroPagina = 0;
  ultimoRegistroPagina = 10;
  totalRegistros = 0;
  rows = 10;

  constructor(
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


    await this.carregarTabela('', '');

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
    return this.categorias ?
      this.primeiroRegistroPagina === (this.categorias.length - this.rows) :
      true;
  }

  isFirstPage(): boolean {
    return this.categorias ? this.primeiroRegistroPagina === 0 : true;
  }

  async clickAdicionar(): Promise<void> {
    await this.rotas.navigate(['/categorias/cadastrar-categorias']);
  }

  limpar(): void {
    this.nome = '';
    this.tipoSituacao = '';
  }

  async carregarTabela(nome: string, situacao: string)
    : Promise<void> {
    this.loading = true;
    const {data,success}  = await this.categoriaService.listar(nome,situacao);
    if (success){
      this.categorias = data.content;
    }
    this.loading = false;

  }

  async clickExcluir(event: Event, idCategoria: number): Promise<void> {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Deseja realmente excluir esta categoria?',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'Não',
      acceptLabel: 'Sim',
      accept: async () => {
        try {
          await this.categoriaService.excluir(idCategoria);
          this.categorias = this.categorias
            .filter(categoria => (categoria.id !== idCategoria));

          this.messageService.add({
            severity: 'success',
            summary: 'OK!',
            detail: 'Categoria excluída com sucesso.'
          });
        } catch (e) {
          console.log(e);

          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao excluir',
            detail: 'Verifique se a categoria possui registros relacionados.'
          });
        }
      },
      reject: () => {
        // reject action
      }
    });
  }
}
