import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBreadPageComponent } from './add-bread-page.component';

describe('AddBreadPageComponent', () => {
  let component: AddBreadPageComponent;
  let fixture: ComponentFixture<AddBreadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBreadPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBreadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
