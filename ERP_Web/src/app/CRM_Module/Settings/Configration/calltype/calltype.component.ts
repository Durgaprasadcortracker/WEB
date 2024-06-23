
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calltype',
  templateUrl: './calltype.component.html',
  styleUrl: './calltype.component.css'
})
export class CalltypeComponent implements OnInit {
  calltypeForm: any; 
  CalltypeList: any;
  currentCalltypeId = 0;

  constructor(private fb: FormBuilder, private http: BackendService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.calltypeId = params.get('calltypeid');
    });

    this.calltypeForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.calltypeForm = this.fb.group({
      id: new FormControl(<number>(0)) ,
      description: new FormControl('')
    });
    this.getapi();
  }

  getapi(): void {
    this.http.getapi('api/Common/GetCallTypes').subscribe((res) => {
      this.CalltypeList = res.data;
    }, (error) => {
      console.error('Error fetching calltypes', error);
    });
  }
  Id:any;
  submitForm(): void {
    const description = this.calltypeForm.get('description')?.value;
    this.calltypeForm.get("id").setValue(this.currentCalltypeId);
    if (this.currentCalltypeId > 0) {
      this.http.putapi(`api/Common/UpdateCallType`, this.calltypeForm.getRawValue()).subscribe((res) => { // Updated endpoint from UpdateSource to UpdateCalltype
        console.log('Calltype updated successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error updating calltype', error);
      });
    } else {
      this.http.postapi('api/Common/AddCallType', { description }).subscribe(() => { // Updated endpoint from SaveSource to SaveCalltype
        console.log('Calltype added successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error adding calltype', error);
      });
    }
  }

  calltypeId: any;
  edit(id: number): void {
    this.currentCalltypeId = id;
    this.getCalltypeById();
  }

  getCalltypeById() {
    this.http.getapi('api/Common/GetCallType/' + this.currentCalltypeId).subscribe((res) => {
      console.log(res);
      this.calltypeForm.get("id")?.setValue(res.data.calltypeId);
      this.calltypeForm.get("description")?.setValue(res.data.description);
    });
  }

  deleteCalltype(id: number): void { 
    this.http.deleteapi(`api/Common/CallType/${id}`).subscribe(() => { 
      console.log('Calltype deleted successfully');
      this.getapi();
    }, (error) => {
      console.error(`Error deleting calltype with id ${id}`, error);
    });
  }

  resetForm(): void {
    this.calltypeForm.reset();
    this.currentCalltypeId = 0;
  }
}


