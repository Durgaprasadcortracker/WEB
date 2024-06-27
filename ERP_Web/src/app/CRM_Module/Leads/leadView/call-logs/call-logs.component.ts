import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-call-logs',
  templateUrl: './call-logs.component.html',
  styleUrl: './call-logs.component.css'
})
export class CallLogsComponent {

  calllogsList: any
  id: any;
  open = 1;
  contactsList: any;
  calltypeslist: any;
  myForm: any;
  submitted: any;
  callsLogs: any;


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
      this.callsLogs = params.get('callsLogs');
      console.log(this.callsLogs);
      if (this.callsLogs == 0) {
        this.open = 2;
      }
      else if(this.callsLogs > 0){
        this.edit(this.callsLogs)
        this.open = 2;
      }
      else if(this.callsLogs == null){
        this.open = 1;
        this.close()
      }
    });
  }


  ngOnInit() {
    this.myForm = this.fb.group({
      id: [0],
      leadId: [this.id, Validators.required],
      contactId: [null, Validators.required],
      callTypes: [null, Validators.required],
      callDate: [null, Validators.required],
      comments: [null, Validators.required]
    });
    console.log(this.myForm.value);
    if (this.callsLogs == 0) {
      this.open = 2
    }
  }
  addCallLog() {
    this.submitted = true;
    console.log(this.myForm.value);
    if (this.myForm.value.id == 0) {
      this.http.postapi('api/Lead/AddCallLogs', this.myForm.value).subscribe((res) => {
        console.log(res);
        this.router.navigate(['/CRM/Leads/leadView/'+this.id+'/callLogs/'+this.id]);
        this.open = 1
        this.getRequiredData()
        this.close()

      });
    }
    else if (this.myForm.value.id > 0) {
      this.http.putapi('api/Lead/UpdateCallLogs', this.myForm.getRawValue()).subscribe((res) => {
        console.log(res);
        this.close()
        this.open = 1
        this.getRequiredData()
        this.router.navigate(['/CRM/Leads/leadView/'+this.id+'/callLogs/'+this.id]);
      });
    }
  }
  getRequiredData() {
    this.http.getapi('api/Lead/GetCallLog/' + this.id).subscribe((res) => {
      console.log(res);
      if (res) {
        this.calllogsList = res
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
    this.ngOnInit()
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
