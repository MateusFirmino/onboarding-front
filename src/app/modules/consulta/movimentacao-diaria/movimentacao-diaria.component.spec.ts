import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MovimentacaoDiariaComponent} from './movimentacao-diaria.component';

describe('MovimentacaoDiariaComponent', () => {
  let component: MovimentacaoDiariaComponent;
  let fixture: ComponentFixture<MovimentacaoDiariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovimentacaoDiariaComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimentacaoDiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
