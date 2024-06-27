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
    const currentTime = new Date();
    this.myForm = this.fb.group({
      Id: [0],
      LeadId: [this.id, Validators.required],
      ReminderName: [null, Validators.required],
      ReminderDate: [null, Validators.required],
      ReminderTime: [null, Validators.required],
      Notes: [null, Validators.required],
      CreatedBy: [1, Validators.required],
      CreatedAt: [currentTime, Validators.required],
      ModifiedBy: [1, Validators.required],
      ModifiedAt: [currentTime, Validators.required],
    });
  }
  addReminder() {
    this.submitted = true;
    const reminderDateTime = `${this.myForm.value.ReminderDate}T${this.myForm.value.ReminderTime}:00`;
    this.myForm.value.ReminderTime = reminderDateTime;
    console.log(this.myForm.value);
    if (this.myForm.value.Id == 0) {
      this.http.postapi('api/Lead/AddReminder', this.myForm.value).subscribe((res) => {
        console.log(res);
        this.close()
        this.router.navigate(['/CRM/leadView/'+this.id+'/reminder/'+this.id]);
        this.open = 1
        this.getRequiredData()

      });
    }
    else if (this.myForm.value.Id > 0) {
      this.http.postapi('api/Lead/UpdateReminder', this.myForm.value).subscribe((res) => {
        console.log(res);
        this.close()
        this.open = 1
        this.getRequiredData()
        this.router.navigate(['/CRM/leadView/'+this.id+'/reminder/'+this.id]);
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
  }
  edit(_id: any) {
    this.http.getapi('api/Lead/GetRemindersby/' + _id).subscribe((res) => {
      if (res) {
        let _obj :any = new Object();
        console.log(res);
        _obj.Id=res.id
        _obj.LeadId=res.leadId
        _obj.ReminderName=res.reminderName
        if (res.reminderDate) {
          const reminderDate = new Date(res.reminderDate);
          reminderDate.setMinutes(reminderDate.getMinutes() + reminderDate.getTimezoneOffset());
          _obj.ReminderDate = reminderDate.toISOString().substring(0, 10);
        }
        _obj.ReminderTime= this.extractTime( res.reminderTime)
        _obj.CreatedBy=res.createdBy
        _obj.CreatedAt=res.createdAt
        _obj.ModifiedBy=res.modifiedBy
        _obj.ModifiedAt=res.modifiedAt
        _obj.Notes=res.notes
        console.log(_obj);
        this.open = 2
        this.myForm.patchValue(_obj);
        console.log(this.myForm.value);
      }
    });
  }
  extractTime(dateTime: string): string {
    return dateTime.slice(11, 16);
  }
  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }
  close() {
    this.myForm.reset();
    this.ngOnInit()
  }
  deleteReminder(ID: any) {
    this.http.deleteapi('api/Lead/DeleteReminder/' + ID).subscribe((res) => {
      console.log(res);
      if (res) {
        this.getRequiredData()
      }
    }
    );
  }

}
