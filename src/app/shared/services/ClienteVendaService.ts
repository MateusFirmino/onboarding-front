import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IPage} from "../interface/page/IPage";
import {environment} from "../../../environments/environment";
import {IClienteVendaList, IClienteVendaView} from "../interface/IClienteVendaView";

@Injectable({
  providedIn: 'root'
})
export class ClienteVendaService {

  urlBase: string = environment.url_api;

  constructor(private http: HttpClient) {
  }

  public async listar(): Promise<IPage<IClienteVendaView>> {
    return this.http.get<IPage<IClienteVendaView>>
    (`${environment.url_api}/clientevenda`).toPromise();
  }

  public async buscar(id: number): Promise<IClienteVendaView> {
    return this.http.get<IClienteVendaView>
    (`${environment.url_api}/clientevenda${id}`).toPromise();
  }

  public async salvar(clienteVenda: IClienteVendaList): Promise<IClienteVendaView> {
    return this.http.post<IClienteVendaView>
    (`${environment.url_api}/clientevenda`, clienteVenda).toPromise();
  }
}
