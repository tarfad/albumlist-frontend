import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserroleCreateComponent } from './userrole-create.component';

describe('UserroleCreateComponent', () => {
  let component: UserroleCreateComponent;
  let fixture: ComponentFixture<UserroleCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserroleCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserroleCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
