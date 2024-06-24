import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.css'
})
export class RemindersComponent {
  remindersList: any
  id: any;
  open = 1;
  contactsList: any;
  calltypeslist: any;
  myForm: any;
  submitted: any;
  reminder: any;


  constructor(private route: ActivatedRoute,
    private http: BackendService,
    private fb: FormBuilder,
    private ActivatedRoute: ActivatedRoute,    
    private router: Router

  ) {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.getRequiredData()
    this.ActivatedRoute.queryParamMap.subscribe((params) => {
      this.reminder = params.get('reminder');
      console.log(this.reminder);
      if (this.reminder == 0) {
        this.open = 2;
      }
      else if(this.reminder > 0){
        this.edit(this.reminder)
        this.open = 2;
      }
      else if(this.reminder == null){
        this.open = 1;
        this.close()
      }
    });
  }


  ngOnInit() {
    if (this.reminder == 0) {
      this.open = 2
    }
    this.myForm = this.fb.group({
      id: [0],
      leadId: [this.id, Validators.required],
      reminderName: [null, Validators.required],
      reminderDate: [null, Validators.required],
      reminderTime: [null, Validators.required],
      notes: [null, Validators.required],
      createdBy: [1, Validators.required],
      createdAt: [1, Validators.required],
      modifiedBy: [1, Validators.required],
      modifiedAt: [1, Validators.required],
    });
  }
  addReminder() {
    this.submitted = true;
    console.log(this.myForm.value);
    if (this.myForm.value.id == 0) {
      this.http.postapi('api/Lead/Reminders', this.myForm.value).subscribe((res) => {
        console.log(res);
        this.myForm.reset();
        this.router.navigate(['/CRM/leadView/'+this.id+'/callLogs/'+this.id]);
        this.open = 1
        this.getRequiredData()

      });
    }
    else if (this.myForm.value.id > 0) {
      this.http.putapi('api/Lead/UpdateCallLogs', this.myForm.getRawValue()).subscribe((res) => {
        console.log(res);
        this.myForm.reset();
        this.open = 1
        this.getRequiredData()
        this.router.navigate(['/CRM/leadView/'+this.id+'/callLogs/'+this.id]);
      });
    }
  }
  getRequiredData() {
    this.http.getapi('api/Lead/GetReminder/' + this.id).subscribe((res) => {
      console.log(res);
      if (res) {
        this.remindersList = res
      }
    });
    this.http.getapi('api/Contacts/GetContacts').subscribe((res) => {
      if (res) {
        this.contactsList = res.data
        console.log(this.contactsList);
      }
    });
    this.http.getapi('api/Common/GetCallTypes').subscribe((res) => {
      if (res) {
        this.calltypeslist = res.data
        console.log(this.calltypeslist);
      }
    });
  }
  edit(_id: any) {
    this.http.getapi('api/Lead/GetCallLogsby/' + _id).subscribe((res) => {
      console.log(res);
      if (res) {
        if (res.callDate) {
          res.callDate = new Date(res.callDate).toISOString().substring(0, 10);
        }
        this.myForm.patchValue(res);
        this.open = 2
        console.log(this.myForm.value);
      }
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }
  close() {
    this.myForm.reset();
  }
  deleteCallLog(ID: any) {
    this.http.deleteapi('api/Lead/DeleteCallLogs/' + ID).subscribe((res) => {
      console.log(res);
      if (res) {
        this.getRequiredData()
      }
    }
    );
  }

}
