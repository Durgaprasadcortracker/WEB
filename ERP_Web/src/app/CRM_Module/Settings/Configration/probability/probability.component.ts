import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-probability',
  templateUrl: './probability.component.html',
  styleUrls: ['./probability.component.css']
})
export class ProbabilityComponent implements OnInit {
  probabilityForm: FormGroup;
  Probabilitylist: any;
  stageList: any[] = [];
  currentProbabilityId = 0;

  constructor(
    private fb: FormBuilder,
    private http: BackendService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const param = params.get('probabilityid');
      this.currentProbabilityId = param ? +param : 0;
    });

    this.probabilityForm = this.fb.group({
      stageId: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getStageValues();
    this.getProbabilities();

    if (this.currentProbabilityId > 0) {
      this.getProbabilityById();
    }
  }

  getProbabilities(): void {
    this.http.getapi('api/Common/GetProbality').subscribe((res) => {
      this.Probabilitylist = res.data;
    }, (error) => {
      console.error('Error fetching probabilities', error);
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
        this.getProbabilities();
        this.resetForm();
      }, (error) => {
        console.error('Error updating probability', error);
      });
    } else {
      this.http.postapi('api/Common/AddProbality', formData).subscribe(() => {
        console.log('Probability added successfully');
        this.getProbabilities();
        this.resetForm();
      }, (error) => {
        console.error('Error adding probability', error);
      });
    }
  }

  edit(id: number): void {
    this.currentProbabilityId = id;
    this.getProbabilityById();
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

  deleteProbability(id: number): void {
    this.http.deleteapi(`api/Common/DeleteProbability/${id}`).subscribe(() => {
      console.log('Probability deleted successfully');
      this.getProbabilities();
    }, (error) => {
      console.error(`Error deleting probability with id ${id}`, error);
    });
  }

  resetForm(): void {
    this.probabilityForm.reset();
    this.currentProbabilityId = 0;
  }

  getStageDescription(stageId: number): string {
    const stage = this.stageList.find(stage => stage.id === stageId);
    return stage ? stage.description : 'Unknown Stage';
  }
}
