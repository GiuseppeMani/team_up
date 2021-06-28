import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElencoUtentiComponent } from './elenco-utenti.component';

describe('ElencoUtentiComponent', () => {
  let component: ElencoUtentiComponent;
  let fixture: ComponentFixture<ElencoUtentiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElencoUtentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElencoUtentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
