import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadMainComponent } from './bulk-upload-main.component';

describe('BulkUploadMainComponent', () => {
  let component: BulkUploadMainComponent;
  let fixture: ComponentFixture<BulkUploadMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BulkUploadMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkUploadMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
