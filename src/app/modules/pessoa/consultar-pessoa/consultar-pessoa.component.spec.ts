import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarPessoaComponent } from './consultar-pessoa.component';

describe('ConsultarPessoaComponent', () => {
  let component: ConsultarPessoaComponent;
  let fixture: ComponentFixture<ConsultarPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarPessoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
