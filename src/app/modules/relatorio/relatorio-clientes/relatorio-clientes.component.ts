import {Component, OnInit} from '@angular/core';
import {IPessoaCombo, IPessoaView} from "../../../shared/interface/IPessoaView";
import {IValorView} from "../../../shared/interface/IValorView";
import {PessoaService} from "../../../shared/services/PessoaService";
import {MensagemService} from "../../../shared/services/mensagem/Mensagem.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-relatorio-clientes',
  templateUrl: './relatorio-clientes.component.html',
  styleUrls: ['./relatorio-clientes.component.scss']
})
export class RelatorioClientesComponent implements OnInit {
  clientes: IPessoaCombo[] = [];
  clientesFiltrados: IPessoaCombo[] = [];
  clienteSelecionado: IPessoaView = {} as IPessoaView;

  pessoaFisica: IValorView;
  pessoaJuridica: IValorView;
  tipos: IValorView[];


  tipoPessoa = '';
  nomePessoa = '';

  loading!: boolean;

  buscar!: string;

  constructor(private pessoaService: PessoaService,
              private mensagemService: MensagemService,
              private route: ActivatedRoute) {

    this.pessoaFisica = {nome: 'Pessoa Física', valor: 'FISICA'};
    this.pessoaJuridica = {nome: 'Pessoa Jurídica', valor: 'JURIDICA'};
    this.tipos = [this.pessoaFisica, this.pessoaJuridica];
  }

  async ngOnInit(): Promise<void> {
    this.buscar = this.route.snapshot.paramMap.get('buscar')!;
    this.clientes = await this.pessoaService.buscarSelect();

    await this.autocompleteCliente('');

    // await this.clickImprimir();

  }

  autocompleteCliente(query: any): void {
    this.clientesFiltrados = [];

    for (const pessoa of this.clientes) {
      if (pessoa.nome.toLowerCase().includes(query.toLowerCase())) {
        this.clientesFiltrados.push(pessoa);
      }
    }
  }

  async clickImprimir(): Promise<void> {

    this.pessoaService.getRelatorio(this.tipoPessoa, this.clienteSelecionado.nome, true).subscribe((res: any) => {
      const file = new Blob([res], {
        type: res.type
      });

      const blob = window.URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = blob;
      link.download = 'rel_movimentacaodiaria.pdf';
      link.click();
      window.URL.revokeObjectURL(blob);
      link.remove();
    })

  }

  async clickPesquisar(): Promise<void> {
    // await this.pdfService.generatePdf({
    //   header: 'RELATÓRIO POR CLIENTE',
    //   table: this.createTable()
    // });
  }

  clickLimpar(): void {
    this.clienteSelecionado = {} as any;
    this.tipoPessoa = '';
  }
}
