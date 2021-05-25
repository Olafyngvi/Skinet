import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnizenoComponent } from './snizeno.component';

describe('SnizenoComponent', () => {
  let component: SnizenoComponent;
  let fixture: ComponentFixture<SnizenoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnizenoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnizenoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
