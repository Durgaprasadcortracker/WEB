import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-socialmedia',
  templateUrl: './add-socialmedia.component.html',
  styleUrl: './add-socialmedia.component.css'
})
export class AddSocialmediaComponent {
  schedulePostForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.schedulePostForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      scheduleDate: ['', Validators.required],
      scheduleTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.schedulePostForm.valid) {
      const formValue = this.schedulePostForm.value;
      const scheduledPost = {
        title: formValue.title,
        content: formValue.content,
        scheduleDate: formValue.scheduleDate,
        scheduleTime: formValue.scheduleTime
      };
      console.log('Scheduled Post:', scheduledPost);
      // Here you can call a service to handle the backend API call
    }
  }
}
