import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlistListComponent } from './yearlist-list.component';

describe('YearlistListComponent', () => {
  let component: YearlistListComponent;
  let fixture: ComponentFixture<YearlistListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearlistListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlistListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
