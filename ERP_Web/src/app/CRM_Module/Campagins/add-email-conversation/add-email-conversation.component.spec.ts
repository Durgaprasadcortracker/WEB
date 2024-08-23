import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmailConversationComponent } from './add-email-conversation.component';

describe('AddEmailConversationComponent', () => {
  let component: AddEmailConversationComponent;
  let fixture: ComponentFixture<AddEmailConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEmailConversationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmailConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
