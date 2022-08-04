export interface IPessoaTelefoneView {
  id: number;
  telefone: string;
  tipoTelefone: number;
  telefonePadrao: string;
  pessoa?: number;
}
export interface IPessoaTelefoneViewList {
  id?: number;
  pessoa?: number;
  telefone: string;
  tipoTelefone: number;
  telefonePadrao: string;
}
export interface ITipoTelefone {
  tipoTelefone: string;
  code: number;
}


