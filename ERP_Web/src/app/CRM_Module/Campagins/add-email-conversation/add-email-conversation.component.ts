import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-email-conversation',
  templateUrl: './add-email-conversation.component.html',
  styleUrl: './add-email-conversation.component.css'
})
export class AddEmailConversationComponent {
  myForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      to: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      body: ['', Validators.required],
      attachment: [''],
      scheduledTime: ['', Validators.required]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }

    // Handle form submission logic here
    console.log(this.myForm.value);
  }
}