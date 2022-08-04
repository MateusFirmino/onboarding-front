import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefonePessoaComponent } from './telefone-pessoa.component';

describe('TelefonePessoaComponent', () => {
  let component: TelefonePessoaComponent;
  let fixture: ComponentFixture<TelefonePessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelefonePessoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TelefonePessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
