import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-probability',
  templateUrl: './probability.component.html',
  styleUrl: './probability.component.css'
})
export class ProbabilityComponent {
close() {
throw new Error('Method not implemented.');
}
  probabilityForm: FormGroup;
  Probabilitylist: any;
  stageList: any[] = [];
  currentProbabilityId = 0;
  constructor(
    private fb: FormBuilder,
    private http: BackendService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const param = params.get('id');
      this.currentProbabilityId = param ? +param : 0;
    });

    this.probabilityForm = this.fb.group({
      stageId: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.getStageValues();
    if (this.currentProbabilityId > 0) {
      this.getProbabilityById();
    }
  }
  getProbabilityById(): void {
    this.http.getapi(`api/Common/GetProbabilityById/${this.currentProbabilityId}`).subscribe((res) => {
      const probability = res.data;
      this.probabilityForm.patchValue({
        stageId: probability.stageId,
        description: probability.description
      });
    }, (error) => {
      console.error('Error fetching probability by ID', error);
    });
  }
  getStageValues(): void {
    this.http.getapi('api/Common/GetStages').subscribe((res) => {
      this.stageList = res.data;
    }, (error) => {
      console.error('Error fetching stages', error);
    });
  }
  submitForm(): void {
    const formData = this.probabilityForm.value;
    formData.id = this.currentProbabilityId;

    if (this.currentProbabilityId > 0) {
      this.http.putapi('api/Common/UpdateProbability', formData).subscribe(() => {
        console.log('Probability updated successfully');
        this.router.navigate(['/CRM/Settings/probabilitylist'])
       
        this.resetForm();
      }, (error) => {
        console.error('Error updating probability', error);
      });
    } else {
      this.http.postapi('api/Common/AddProbality', formData).subscribe(() => {
        console.log('Probability added successfully');
        this.router.navigate(['/CRM/Settings/probabilitylist'])
        this.resetForm();
        this.snackBar.open('Probability Added successfully!', 'Close', {
               duration: 3000, // Snackbar stays open for 3 seconds
           });
      }, (error) => {
        console.error('Error adding probability', error);
      });
    }
  }
  resetForm(): void {
    this.probabilityForm.reset();
    this.currentProbabilityId = 0;
  }
}
