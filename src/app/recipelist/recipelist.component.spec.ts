/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecipelistComponent } from './recipelist.component';

describe('RecipelistComponent', () => {
  let component: RecipelistComponent;
  let fixture: ComponentFixture<RecipelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
