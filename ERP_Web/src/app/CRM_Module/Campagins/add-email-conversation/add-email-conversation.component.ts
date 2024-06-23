import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-email-conversation',
  templateUrl: './add-email-conversation.component.html',
  styleUrl: './add-email-conversation.component.css'
})
export class AddEmailConversationComponent {
  campaignForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.campaignForm = this.fb.group({
      name: ['', Validators.required],
      subject: ['', Validators.required],
      fromAddress: ['', Validators.required],
      lists: [''],
      template: [''],
      messenger: ['', Validators.required],
      tags: [''],
      sendLater: [''],
      customHeaders: ['']
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    this.submitted = true;
    if (this.campaignForm.valid) {
      console.log('Form Submitted', this.campaignForm.value);
      // Handle form submission logic
    }
  }

}
