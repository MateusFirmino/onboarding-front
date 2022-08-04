import {IProdutoView} from "./IProdutoView";
import {IClienteVendaView} from "./IClienteVendaView";

export interface IVendaItemView {
  id: number;
  clienteVenda: IClienteVendaView;
  produto: IProdutoView;
  qtde: number;
  valor: number;
  valorDesconto: number;
  precoTotal: number;
}

export interface IVendaItemViewList {
  id?: number;
  clienteVenda?: number;
  idProduto: number;
  quantidade: number;
  valor: number;
  desconto: number;
  subtotal: number;
}

export interface IVendaItemViewSave {
  id?: number;
  nome: string;
  qtde: number;
  valor: number;
  valorDesconto: number;
  precoTotal: number;
}

export interface ItensMovimentacao {
  data: string;
  produto: string;
  qtd: number;
  valor: number;
  cliente: string;
  vendedor: string;
}



