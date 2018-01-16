import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {UserGroupCreateComponent} from "./usergroup-create.component";


describe('UserGroupCreateComponent', () => {
  let component: UserGroupCreateComponent;
  let fixture: ComponentFixture<UserGroupCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserGroupCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
