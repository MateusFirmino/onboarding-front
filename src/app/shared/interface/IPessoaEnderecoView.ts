import {IPessoaView} from "./IPessoaView";

export interface IPessoaEnderecoView {
  id: number;
  logradouro: string;
  numero: number;
  cep: string;
  bairro: string;
  cidade: string;
  uf: string;
  enderecoPadrao: string;
}
export interface IPessoaEnderecoViewList {
  id?: number;
  logradouro: string;
  numero: number;
  cep: string;
  bairro: string;
  cidade: string;
  uf: string;
  enderecoPadrao: string;
  pessoa?: number;
}
