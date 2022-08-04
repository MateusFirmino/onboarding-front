import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {IPage} from "../interface/page/IPage";
import {IBuscarProduto, IProdutoPost, IProdutoView} from "../interface/IProdutoView";
import {IResultHttp} from "../interface/IResultHttp";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  urlBase: string = environment.url_api;

  constructor(private http: HttpClient) {
  }

  public async listar(idCategoria: number | null, nome: string, situacao: string) {
    const url = `${this.urlBase}/produtos`;
    const categoria = !!idCategoria ? idCategoria : '';
    return this.http.get<IResultHttp<IPage<IProdutoView>>>(`${url}?nome=${nome}&situacao=${situacao}&categoria=${categoria}`).toPromise();
  }

  public async buscar(id: number): Promise<IProdutoView> {
    return this.http.get<IProdutoView>
    (`${environment.url_api}/produtos/${id}`).toPromise();
  }

  public async buscarProduto(): Promise<IBuscarProduto[]> {
    return this.http.get<IBuscarProduto[]>(`${environment.url_api}/produtos/nome`).toPromise();
  }

  public getRelatorio(idCategoria: number, nome: string, situacao: string, rel: boolean = false): Observable<IProdutoView[]> {
    const url = `${this.urlBase}/produtos/relatorio`;
    const categoria = !!idCategoria ? idCategoria : '';
    const produto = !!nome ? nome : '';
    const situ = !!situacao ? situacao : '';

    if (rel) {
      return this.http.get<IProdutoView[]>(`${url}?nome=${produto}&situacao=${situ}&idCategoria=${categoria}`, {
        responseType: 'blob' as 'json'
      });
    }
    return this.http.get<IProdutoView[]>(`${url}?nome=${produto}&situacao=${situ}&idCategoria=${categoria}`);
  }

  public async salvar(produto: IProdutoPost): Promise<IProdutoView> {
    return this.http.post<IProdutoView>
    (`${environment.url_api}/produtos`, produto).toPromise();
  }

  public async alterar(
    idProduto: number,
    produto: IProdutoPost
  ): Promise<IProdutoView> {
    return this.http.put<IProdutoView>
    (`${environment.url_api}/produtos/${idProduto}`, produto).toPromise();
  }

  public async excluir(id: number): Promise<object> {
    return this.http.delete(`${environment.url_api}/produtos/${id}`).toPromise();
  }
}
