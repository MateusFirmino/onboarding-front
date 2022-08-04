import {IPage} from '../interface/page/IPage';
import {IPessoaEmailView, IPessoaEmailViewList} from '../interface/IPessoaEmailView';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {IResultHttp} from "../interface/IResultHttp";


@Injectable({
  providedIn: 'root'
})
export class PessoaEmailService {

  urlBase: string = environment.url_api;

  constructor(private http: HttpClient) {
  }

  async getAll(pessoaId: number): Promise<IPage<IPessoaEmailView>> {
    const url = `${this.urlBase}/pessoas/${pessoaId}/emails`;
    return await this.http.get<IPage<IPessoaEmailView>>(url).toPromise();
  }

  async post(pessoaId: number | undefined, endereco: IPessoaEmailViewList)
    : Promise<IPessoaEmailView> {
    const url = `${this.urlBase}/pessoas/${pessoaId}/emails`;
    return await this.http.post<Promise<IPessoaEmailView>>
    (url, endereco).toPromise();
  }

  public async put(pessoaId: number | undefined, email: IPessoaEmailViewList) {
    return this.http.put<IResultHttp<IPessoaEmailView>>(`${environment.url_api}/pessoas/${pessoaId}/emails/${email.id}`, email).toPromise();
  }

  async delete(pessoaId: number, emailId: number): Promise<void> {
    const url = `${this.urlBase}/pessoas/${pessoaId}/emails/${emailId}`;
    this.http.delete(url).subscribe();
  }
}
