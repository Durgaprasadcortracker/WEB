import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stagedesign',
  templateUrl: './stagedesign.component.html',
  styleUrl: './stagedesign.component.css'
})
export class StagedesignComponent {

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form group with form controls and validators
    this.myForm = this.fb.group({
      addcountry: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9.-]+$')]]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm.value;
      console.log('Form Data:', formData);
          } else {
      console.log('Field is invalid');
    }
  }

  close() {
    console.log('field closed');
    }

}
