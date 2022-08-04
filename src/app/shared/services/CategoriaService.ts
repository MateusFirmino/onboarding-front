import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IPage} from "../interface/page/IPage";
import {ICategoriaPost, ICategoriaSelect, ICategoriaView} from "../interface/ICategoriaView";
import {Injectable} from "@angular/core";
import {IResultHttp} from "../interface/IResultHttp";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  urlBase: string = environment.url_api;

  constructor(private http: HttpClient) {
  }

  public async listar(nome: string, situacao: string) {
    const url = `${this.urlBase}/categorias`;
    return this.http.get<IResultHttp<IPage<ICategoriaView>>>(url,
      {
        params: new HttpParams()
          .set('nome', nome)
          .set('situacao', situacao)
      }).toPromise();
  }

  public async buscar(id: number): Promise<ICategoriaView> {
    return this.http.get<ICategoriaView>(`${environment.url_api}/categorias/${id}`).toPromise();
  }

  public async buscarSelect(): Promise<ICategoriaSelect[]> {
    return this.http.get<ICategoriaSelect[]>(`${environment.url_api}/categorias/combo`).toPromise();
  }

  public async salvar(categoria: ICategoriaPost): Promise<ICategoriaView> {
    return this.http.post<ICategoriaView>
    (`${environment.url_api}/categorias`, categoria).toPromise();
  }

  public async alterar(
    idCategoria: number,
    categoria: ICategoriaPost
  ): Promise<ICategoriaView> {
    return this.http.put<ICategoriaView>(`${environment.url_api}/categorias/${idCategoria}`, categoria).toPromise();
  }

  public async excluir(id: number): Promise<object> {
    return this.http
      .delete(`${environment.url_api}/categorias/${id}`).toPromise();
  }
}
