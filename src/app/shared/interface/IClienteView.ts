import { IPessoaEmailView } from './IPessoaEmailView';
import { IPessoaTelefoneView } from './IPessoaTelefoneView';
import { IPessoaEnderecoView } from './IPessoaEnderecoView';
import { IPessoaView } from './IPessoaView';

export interface IClienteView {
  pessoaForm: IPessoaView;
  pessoaEnderecoForms: IPessoaEnderecoView[];
  pessoaTelefoneForms: IPessoaTelefoneView[];
  pessoaEmailForms: IPessoaEmailView[];
}
