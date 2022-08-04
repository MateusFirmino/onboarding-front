import {IPessoaView} from "./IPessoaView";
import {IVendaItemViewList} from "./IVendaItemView";

export interface IClienteVendaView {
  id: number;
  pessoa: IPessoaView;
  dataVenda: Date;
  usuarioVenda: string;
  valorTotal: number;
  descontoVenda: number;
  situacao: number;
}

export interface IClienteVendaList {
  id?: number;
  idPessoa: number;
  usuarioVenda: string;
  valorTotal: number;
  descontoVenda: number;
  situacao: string;
  observacao: string;
  itens?: IVendaItemViewList[];
}



