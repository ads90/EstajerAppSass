import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewAppComponent } from './calendar-app.component';

describe('OverviewAppComponent', () => {
  let component: OverviewAppComponent;
  let fixture: ComponentFixture<OverviewAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverviewAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverviewAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
