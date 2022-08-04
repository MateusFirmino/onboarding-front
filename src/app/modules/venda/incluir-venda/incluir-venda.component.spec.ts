import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IncluirVendaComponent} from './incluir-venda.component';

describe('IncluirVendaComponent', () => {
  let component: IncluirVendaComponent;
  let fixture: ComponentFixture<IncluirVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncluirVendaComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncluirVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
