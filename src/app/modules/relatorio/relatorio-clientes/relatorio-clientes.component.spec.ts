import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RelatorioClientesComponent} from './relatorio-clientes.component';

describe('RelatorioClientesComponent', () => {
  let component: RelatorioClientesComponent;
  let fixture: ComponentFixture<RelatorioClientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatorioClientesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
