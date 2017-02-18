/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditfoodcatComponent } from './editfoodcat.component';

describe('EditfoodcatComponent', () => {
  let component: EditfoodcatComponent;
  let fixture: ComponentFixture<EditfoodcatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditfoodcatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfoodcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
