import {Component} from '@angular/core';

import {MenuItem, PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  items: MenuItem[];

  constructor() {
    this.items = [
      {
        label: 'Pagina inicial', routerLink: '/home',
        icon: PrimeIcons.CHART_BAR,
      },
      {
        label: 'Cadastro',
        icon: PrimeIcons.PLUS,
        items: [
          { label: 'Cliente', routerLink: '/pessoa/consultar-pessoas' },
          { label: 'Categoria', routerLink: '/categorias/consultar-categorias' },
          { label: 'Produto', routerLink: 'produtos/consultar-produtos' }
        ]
      },
      {
        label: 'Venda',
        icon: PrimeIcons.DOLLAR,
        items: [
          { label: 'Incluir Vendas', routerLink: '/venda/incluir-vendas' }
        ]
      },
      {
        label: 'Consulta',
        icon: PrimeIcons.SEARCH,
        items: [
          { label: 'Movimentação Diária', routerLink: '/consulta/movimentacao-diaria' }
        ]
      },
      {
        label: 'Relatório',
        icon: PrimeIcons.FILE,
        items: [
          {label: 'Relatório por Venda', routerLink: 'relatorio/relatorio-vendas'},
          {label: 'Relatório de Produtos', routerLink: 'relatorio/relatorio-produtos'},
          {label: 'Relatório de Clientes', routerLink: 'relatorio/relatorio-clientes'}
        ]
      }
    ];
  }
}
