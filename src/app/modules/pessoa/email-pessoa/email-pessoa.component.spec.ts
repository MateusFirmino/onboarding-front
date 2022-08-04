import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPessoaComponent } from './email-pessoa.component';

describe('EmailPessoaComponent', () => {
  let component: EmailPessoaComponent;
  let fixture: ComponentFixture<EmailPessoaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailPessoaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailPessoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
