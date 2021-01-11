import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecapitulatifDonneeComponent } from './recapitulatif-donnee.component';

describe('RecapitulatifDonneeComponent', () => {
  let component: RecapitulatifDonneeComponent;
  let fixture: ComponentFixture<RecapitulatifDonneeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecapitulatifDonneeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecapitulatifDonneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
