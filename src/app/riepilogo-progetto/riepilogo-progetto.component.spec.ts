import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiepilogoProgettoComponent } from './riepilogo-progetto.component';

describe('RiepilogoProgettoComponent', () => {
  let component: RiepilogoProgettoComponent;
  let fixture: ComponentFixture<RiepilogoProgettoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiepilogoProgettoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiepilogoProgettoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
