import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  stateForm: any;
  stateList: any;
  CountryList: any;

  stateId: any;
  submited: any;
  states: any;
  currentStateId: any;

  constructor(
  private fb: FormBuilder,private http: BackendService,private router: Router,private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.stageId = params.get('stageid'); 
    });

    this.stateForm = this.fb.group({
      description: ['', Validators.required]
    });
  }
  

  ngOnInit(): void {
    this.getapi();
    this.getCountry();
    this.getstates();

    this.stateForm = this.fb.group({
      id: [0],
      description: [null, Validators.required],
      countryId: [null, Validators.required]
    });

  }

  getapi(): void {
    this.http.getapi('api/Common/GetStages').subscribe((res) => {
      this.stateList = res;
    }, (error) => {
      console.error('Error fetching stages', error);
    });
  }
  getCountry() {
    this.http.getapi('api/Common/GetCountries').subscribe((res) => {
      this.CountryList = res.data;
    });
  }
  getstates() {
    this.http.getapi('api/Common/GetStates').subscribe((res)=> {
      console.log(res);
      this.states = res.data
    });
  }

  Id:any;
  submitForm(): void {
    const formData = this.stateForm.getRawValue();
    if (this.currentStateId > 0) {
      this.http.putapi('api/Common/UpdateState', formData).subscribe(() => { // Updated API endpoint
        console.log('State updated successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error updating state', error);
      });
    } else {
      this.http.postapi('api/Common/AddState', { description: formData.description }).subscribe(() => { // Updated API endpoint
        console.log('State added successfully');
        debugger
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error adding state', error);
      });
    }
   
  }
  stageId: any;
  edit(id: number): void {
    this.currentStateId = id;
    this.getStateById();
  }

  getStateById(): void {
    this.http.getapi(`api/Common/GetState/${this.stageId}`).subscribe((res) => { 
      this.stateForm.patchValue({
        id: res.data.stageId, 
        description: res.data.description
      });
    }, (error) => {
      console.error('Error fetching stage details', error);
    });
  }

  // onTableDataChange(event: any) {
  //   this.page = event;
  //   this.getapi();
  // }
  // onTableSizeChange(event: any): void {
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  //   this.getapi();
  // }
  
  deletestate(id: number): void {
    this.http.deleteapi(`api/Common/DeleteState/${id}`).subscribe(() => { 
      console.log('State deleted successfully');
      this.getapi();
      this.ngOnInit()
    }, (error) => {
      console.error(`Error deleting state with id ${id}`, error);
    });
  }

  resetForm(): void {
    this.stateForm.reset({ id: 0, description: '' });
    this.currentStateId = 0;
  }
}
