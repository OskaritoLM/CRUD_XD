import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LugarAdmunComponent } from './lugar-admun.component';

describe('LugarAdmunComponent', () => {
  let component: LugarAdmunComponent;
  let fixture: ComponentFixture<LugarAdmunComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LugarAdmunComponent]
    });
    fixture = TestBed.createComponent(LugarAdmunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
