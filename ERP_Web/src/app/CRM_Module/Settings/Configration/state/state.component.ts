import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrl: './state.component.css'
})
export class StateComponent implements OnInit {
  stateForm: any;
  stateList: any;
  currentStateId = 0;
  countryList: any;
  cityList: any;
  stateId: any;

  constructor(private fb: FormBuilder, private http: BackendService, private router: Router, private activatedRoute: ActivatedRoute) {
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
    this.getCountryValues();
    this.stateForm = new FormGroup({
      id: new FormControl(<Number>(0)),
      countryId: new FormControl('', Validators.required),
      cityId: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
    this.getapi();
  }

  getapi(): void {
    this.http.getapi('api/Common/GetStates').subscribe((res) => {
      this.stateList = res.data;
    }, (error) => {
      console.error('Error fetching states', error);
    });
  }

  getCountryValues(): void {
    this.http.getapi('api/Common/GetCountries').subscribe((res) => {
      this.countryList = res.data;
      this.getCityValues();
    }, (error) => {
      console.error('Error fetching countries', error);
    });
  }

  getCityValues(): void {
    this.http.getapi('api/Common/GetCities').subscribe((res) => {
      this.cityList = res.data;
    }, (error) => {
      console.error('Error fetching cities', error);
    });
  }

  submitForm(): void {
    const stateData = this.stateForm.getRawValue();
    this.stateForm.get("id").setValue(this.stateId);
    if (this.stateId > 0) {
      this.http.putapi(`api/Common/UpdateState`, stateData).subscribe((res) => {
        console.log('State updated successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error updating state', error);
      });
    } else {
      this.http.postapi('api/Common/AddStates', stateData).subscribe(() => {
        console.log('State added successfully');
        this.getapi();
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
    this.http.getapi('api/Common/GetStateById/' + this.stateId).subscribe((res) => {
      const stateData = res.data;
      this.stateForm.get("countryId")?.setValue(stateData.countryId);
      this.stateForm.get("cityId")?.setValue(stateData.cityId);
      this.stateForm.get("description")?.setValue(stateData.description);
    });
  }

  deleteState(id: number): void {
    this.http.deleteapi(`api/Common/DeleteState/${id}`).subscribe(() => {
      console.log('State deleted successfully');
      this.getapi();
    }, (error) => {
      console.error(`Error deleting state with id ${id}`, error);
    });
  }

  resetForm(): void {
    this.stateForm.reset();
    this.currentStateId = 0;
  }
}