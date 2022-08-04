import {IPage} from '../interface/page/IPage';
import {IPessoaEnderecoView, IPessoaEnderecoViewList} from '../interface/IPessoaEnderecoView';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {IResultHttp} from "../interface/IResultHttp";


@Injectable({
  providedIn: 'root'
})
export class PessoaEnderecoService {

  urlBase: string = environment.url_api;

  constructor(private http: HttpClient) {
  }

  async getAll(pessoaId: number): Promise<IPage<IPessoaEnderecoView>> {
    const url = `${this.urlBase}/pessoas/${pessoaId}/enderecos`;
    return await this.http.get<IPage<IPessoaEnderecoView>>(url).toPromise() as IPage<IPessoaEnderecoView>;
  }

  async post(pessoaId: number | undefined, endereco: IPessoaEnderecoViewList)
    : Promise<IPessoaEnderecoView> {
    const url = `${this.urlBase}/pessoas/${pessoaId}/enderecos`;
    return await this.http.post<Promise<IPessoaEnderecoView>>
    (url, endereco).toPromise();
  }

  public async put(pessoaId: number | undefined, endereco: IPessoaEnderecoViewList) {
    return this.http.put<IResultHttp<IPessoaEnderecoView>>(`${environment.url_api}/pessoas/${pessoaId}/enderecos/${endereco.id}`, endereco).toPromise();
  }


  async delete(pessoaId: number, enderecoId: number): Promise<void> {
    const url = `${this.urlBase}/pessoas/${pessoaId}/enderecos/${enderecoId}`;
    this.http.delete(url).subscribe();
  }
}
