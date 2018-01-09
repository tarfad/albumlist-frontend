import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglistListComponent } from './reglist-list.component';

describe('ReglistListComponent', () => {
  let component: ReglistListComponent;
  let fixture: ComponentFixture<ReglistListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglistListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReglistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
