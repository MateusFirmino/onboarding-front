import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';
import {IPage} from "../interface/page/IPage";
import {ItensMovimentacao, IVendaItemView, IVendaItemViewList} from "../interface/IVendaItemView";
import {IResultHttp} from "../interface/IResultHttp";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class VendaItemService {

  urlBase: string = environment.url_api;

  constructor(private http: HttpClient) {
  }

  public async listar(dataInicial: string, dataFinal: string, valorInicial: number, valorFinal: number, idProduto: number, idPessoa: number) {
    const url = `${this.urlBase}/vendas`;
    const produto = !!idProduto ? idProduto : '';
    const pessoa = !!idPessoa ? idPessoa : '';
    const valorI = !!valorInicial ? valorInicial : '';
    const valorF = !!valorFinal ? valorFinal : '';

    return this.http.get<IResultHttp<IPage<ItensMovimentacao>>>(`${url}?dataInicial=${dataInicial}&dataFinal=${dataFinal}&valorInicial=${valorI}&valorFinal=${valorF}&idProduto=${produto}&idPessoa=${pessoa}`).toPromise();
  }

  public getMovimentacao(dataInicial: string = '', dataFinal: string = '', valorInicial: number, valorFinal: number, idProduto: number, idPessoa: number, rel: boolean = false): Observable<ItensMovimentacao[]> {
    const url = `${this.urlBase}/vendas/relatorio`;
    const produto = !!idProduto ? idProduto : '';
    const pessoa = !!idPessoa ? idPessoa : '';
    const valorI = !!valorInicial ? valorInicial : '';
    const valorF = !!valorFinal ? valorFinal : '';
    if (rel) {
      return this.http.get<ItensMovimentacao[]>(`${url}?dataInicial=${dataInicial}&dataFinal=${dataFinal}&valorInicial=${valorI}&valorFinal=${valorF}&idProduto=${produto}&idPessoa=${pessoa}`, {
        responseType: 'blob' as 'json'
      });
    }
    return this.http.get<ItensMovimentacao[]>(`${url}?dataInicial=${dataInicial}&dataFinal=${dataFinal}&valorInicial=${valorI}&valorFinal=${valorF}&idProduto=${produto}&idPessoa=${pessoa}`);
  }

  public async buscar(id: number): Promise<IVendaItemView> {
    return this.http.get<IVendaItemView>
    (`${environment.url_api}/vendas/itens/${id}`).toPromise();
  }

  public async salvar(vendaItem: IVendaItemViewList): Promise<IVendaItemView> {
    return this.http.post<IVendaItemView>
    (`${environment.url_api}/vendas/itens`, vendaItem).toPromise();
  }
}
