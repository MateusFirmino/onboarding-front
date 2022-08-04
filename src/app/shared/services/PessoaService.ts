import {IPessoaCombo, IPessoaPost, IPessoaPut, IPessoaView} from '../interface/IPessoaView';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {IPage} from "../interface/page/IPage";
import {IResultHttp} from "../interface/IResultHttp";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  urlBase: string = environment.url_api;

  constructor(private http: HttpClient) {
  }

  listar(nome: string, tipoPessoa: string, situacao: string) {
    const url = `${this.urlBase}/pessoas`;
    return this.http.get<IResultHttp<IPage<IPessoaView>>>(url,
      {
        params: new HttpParams()
          .set('nome', nome)
          .set('tipoPessoa', tipoPessoa)
          .set('situacao', situacao)
      }).toPromise();
  }

  public async buscar(id: number): Promise<IPessoaView> {
    return this.http.get<IPessoaView>
    (`${environment.url_api}/pessoas/${id}`).toPromise();
  }

  public async buscarSelect(): Promise<IPessoaCombo[]> {
    return this.http.get<IPessoaCombo[]>(`${environment.url_api}/pessoas/nome`).toPromise();
  }

  public async salvar(pessoa: IPessoaPost) {
    return this.http.post<IResultHttp<IPessoaView>>(`${environment.url_api}/pessoas`, pessoa).toPromise();
  }

  public async editar(id: number, pessoa: IPessoaPut) {
    return this.http.put<IResultHttp<IPessoaView>>(`${environment.url_api}/pessoas/${id}`, pessoa).toPromise();
  }

  public async excluir(id: number): Promise<object> {
    return this.http.delete(`${environment.url_api}/pessoas/${id}`).toPromise();
  }

  public getRelatorio(tipoPessoa: string, nome: string, rel: boolean = false): Observable<IPessoaCombo[]> {
    const url = `${this.urlBase}/pessoas/relatorio`;
    const tipo = !!tipoPessoa ? tipoPessoa : '';
    const pessoa = !!nome ? nome : '';
    if (rel) {
      return this.http.get<IPessoaView[]>(`${url}?&tipoPessoa=${tipo}&nome=${pessoa}`, {
        responseType: 'blob' as 'json'
      });
    }
    return this.http.get<IPessoaView[]>(`${url}?&tipoPessoa=${tipo}&nome=${pessoa}`);
  }
}
