import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  stateForm: FormGroup;
  stateList: any;
  currentStateId = 0;
  countryList: any;
  cityList: any;
  stateId: any;

  constructor(private fb: FormBuilder, 
              private http: BackendService, 
              private router: Router, 
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.stateId = params.get('stateid');
    });

    this.stateForm = this.fb.group({
      countryId: ['', Validators.required],
      cityId: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCountry();
    this.getCity();
    if (this.stateId) {
      this.getStateById();
    }
  }

  getCountry() {
    this.http.getapi('api/Common/GetCountry').subscribe((res) => {
      this.countryList = res.data;
    });
  }

  getCity() {
    this.http.getapi('api/Common/GetCities').subscribe((res) => {
      this.cityList = res.data;
    });
  }

  submitForm(): void {
    const stateData = this.stateForm.getRawValue();
    if (this.stateId) {
      this.http.putapi(`api/Common/states/${this.stateId}`, stateData).subscribe((res) => {
        console.log('State updated successfully');
        this.resetForm();
      }, (error) => {
        console.error('Error updating state', error);
      });
    } else {
      this.http.postapi('api/Common/states', stateData).subscribe(() => {
        console.log('State added successfully');
        this.resetForm();
      }, (error) => {
        console.error('Error adding state', error);
      });
    }
  }

  edit(id: number): void {
    this.stateId = id;
    this.getStateById();
  }

  getStateById() {
    this.http.getapi(`api/Common/GetStateById/${this.stateId}`).subscribe((res) => {
      const stateData = res.data;
      this.stateForm.patchValue({
        countryId: stateData.countryId,
        cityId: stateData.cityId,
        description: stateData.description
      });
    });
  }

  deleteState(id: number): void {
    this.http.deleteapi(`api/Common/DeleteState/${id}`).subscribe(() => {
      console.log('State deleted successfully');
    }, (error) => {
      console.error(`Error deleting state with id ${id}`, error);
    });
  }

  resetForm(): void {
    this.stateForm.reset();
    this.stateId = 0;
  }
}
