import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTComponent } from './header-t.component';

describe('HeaderTComponent', () => {
  let component: HeaderTComponent;
  let fixture: ComponentFixture<HeaderTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderTComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
