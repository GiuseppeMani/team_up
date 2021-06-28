import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgettiTeamMateComponent } from './progetti-team-mate.component';

describe('ProgettiTeamMateComponent', () => {
  let component: ProgettiTeamMateComponent;
  let fixture: ComponentFixture<ProgettiTeamMateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgettiTeamMateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgettiTeamMateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
