export interface IPessoaView {
  id: number;
  nome: string;
  cpfCnpj: string;
  dataNascimento: Date;
  sexo: string;
  inscricaoEstadual: string;
  situacao: string;
  tipoPessoa: string;
}
export interface IPessoaPost {
  nome: string;
  cpfCnpj: string;
  dataNascimento?: string;
  sexo: string;
  inscricaoEstadual?: string;
  situacao: string;
  tipoPessoa?: string;
}
export interface IPessoaPut {
  nome: string;
  cpfCnpj: string;
  dataNascimento?: string;
  sexo?: string;
  inscricaoEstadual?: string;
  situacao: string;
  tipoPessoa?: string;
}

export interface IPessoaSelect {
  id: number;
  nome: string;
}

export interface IPessoaCombo {
  id: number;
  nome: string;
  cpfCnpj: string;
}

