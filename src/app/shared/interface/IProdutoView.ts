import {ICategoriaView} from "./ICategoriaView";

export interface IProdutoView {
  id: number;
  nome: string;
  tipoProduto: number;
  qtde: number;
  valor: number;
  valorDesconto: number;
  dataCadastro: Date;
  usuarioCadastro: string;
  situacao: string;
  categoria: ICategoriaView;
}

export interface IProdutoPost {
  categoria?: { id?: number };
  nome: string;
  tipoProduto: number;
  qtde: number;
  valor: number;
  valorDesconto: number;
  usuarioCadastro: string;
  situacao: string;
}

export interface IProdutoSelect {
  id: number;
  nome: string;
}

export interface IBuscarProduto {
  id: number;
  nome: string;
  qtde: number;
  valor: number;
  valorDesconto: number;
}

