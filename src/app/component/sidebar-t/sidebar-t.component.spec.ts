import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarTComponent } from './sidebar-t.component';

describe('SidebarTComponent', () => {
  let component: SidebarTComponent;
  let fixture: ComponentFixture<SidebarTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarTComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
