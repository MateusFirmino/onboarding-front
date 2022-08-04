import {IPage} from '../interface/page/IPage';
import {IPessoaTelefoneView, IPessoaTelefoneViewList} from '../interface/IPessoaTelefoneView';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {IResultHttp} from "../interface/IResultHttp";


@Injectable({
  providedIn: 'root'
})
export class PessoaTelefoneService {

  urlBase: string = environment.url_api;

  constructor(private http: HttpClient) {
  }

  public async listar(idPessoa: number): Promise<IPage<IPessoaTelefoneView>> {
    return this.http.get<IPage<IPessoaTelefoneView>>(`${environment.url_api}/pessoas/${idPessoa}/telefones`).toPromise();
  }

  async post(pessoaId: number | undefined, telefone: IPessoaTelefoneViewList)
    : Promise<IPessoaTelefoneView> {
    const url = `${this.urlBase}/pessoas/${pessoaId}/telefones`;
    return await this.http.post<Promise<IPessoaTelefoneView>>
    (url, telefone).toPromise();
  }

  public async put(pessoaId: number | undefined, telefone: IPessoaTelefoneViewList) {
    return this.http.put<IResultHttp<IPessoaTelefoneView>>(`${environment.url_api}/pessoas/${pessoaId}/telefones/${telefone.id}`, telefone).toPromise();
  }

  async delete(pessoaId: number, telefoneId: number): Promise<void> {
    const url = `${this.urlBase}/pessoas/${pessoaId}/telefones/${telefoneId}`;
    this.http.delete(url).subscribe();
  }
}
