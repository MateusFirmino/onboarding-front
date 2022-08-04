import {Component, OnInit} from '@angular/core';
import {ICategoriaPost, ICategoriaView} from "../../../shared/interface/ICategoriaView";
import {CategoriaService} from "../../../shared/services/CategoriaService";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-cadastrar-categoria',
  templateUrl: './cadastrar-categoria.component.html',
  styleUrls: ['./cadastrar-categoria.component.scss']
})
export class CadastrarCategoriaComponent implements OnInit {

  situacao: any[] = [
    {nome: 'Ativo', code: 'ATIVO'},
    {nome: 'Inativo', code: 'INATIVO'}
  ];

  nome = '';
  situacaoSelecionada = {nome: 'Ativo', code: 'ATIVO'};

  idCategoriaExistente!: number | null;

  categoria: ICategoriaView = {} as ICategoriaView;
  novaCategoria: ICategoriaPost = {} as ICategoriaPost;

  constructor(
    private categoriaService: CategoriaService,
    private rotas: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService
  ) {

  }

  async ngOnInit(): Promise<void> {
    this.idCategoriaExistente = this.activatedRoute.snapshot.paramMap.get('id') as number | null;

    if (this.idCategoriaExistente) {
      await this.loadCategoria(+this.idCategoriaExistente);
    }
  }

  async clickSalvar(): Promise<void> {
    this.novaCategoria = {
      nome: this.nome,
      situacao: this.situacaoSelecionada.code
    };

    try {
      if (this.idCategoriaExistente) {
        const idCategoriaExistenteNumber = +this.idCategoriaExistente;
        await this.categoriaService
          .alterar(idCategoriaExistenteNumber, this.novaCategoria);

        this.messageService.add({
          severity: 'success',
          summary: 'OK!',
          detail: 'Cliente alterado com sucesso.'
        });
      } else {
        await this.categoriaService.salvar(this.novaCategoria);

        this.messageService.add({
          severity: 'success',
          summary: 'OK!',
          detail: 'Cliente salvo com sucesso.'
        });
      }

      await this.rotas.navigate(['/categorias/consultar-categorias']);
    } catch (e) {
      console.log(e);

      if (this.idCategoriaExistente) {
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

  async loadCategoria(idCategoria: number): Promise<void> {
    this.categoria = await this.categoriaService.buscar(idCategoria);

    const situacaoSelecionada = this.categoria.situacao === 'ATIVO' ? this.situacao[0] : this.situacao[1];


    this.nome = this.categoria.nome;
    this.situacaoSelecionada = situacaoSelecionada;
  }

  async clickCancelar(): Promise<void> {
    await this.rotas.navigate(['/categorias/consultar-categorias']);
  }
}
