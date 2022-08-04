import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecoPessoaComponent } from './endereco-pessoa.component';

describe('EnderecoPessoaComponent', () => {
  let component: EnderecoPessoaComponent;
  let fixture: ComponentFixture<EnderecoPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnderecoPessoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnderecoPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
