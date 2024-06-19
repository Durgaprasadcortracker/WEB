import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';

@Component({
  selector: 'app-probability',
  templateUrl: './probability.component.html',
  styleUrls: ['./probability.component.css']
})
export class ProbabilityComponent implements OnInit {
  probabilityForm: FormGroup;
  Probabilitylist: any;
  currentProbabilityId: number | null = null;

  constructor(private fb: FormBuilder, private http: BackendService) {
    this.probabilityForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getapi();
  }

  getapi(): void {
    this.http.getapi('api/Common/GetProbality').subscribe((res) => {
      this.Probabilitylist = res.data;
    });
  }

  submitForm(): void {
    const description = this.probabilityForm.get('description')?.value;
    if (this.currentProbabilityId === null) {
      this.http.postapi('api/Common/AddProbality', { description }).subscribe(() => {
        this.getapi();
        this.resetForm();
      });
    } else {
      this.http.putapi(this.currentProbabilityId, { description }).subscribe(() => {
        this.getapi();
        this.resetForm();
      });
    }
  }

  putapi(id: number): void {
    this.http.getapi(`api/Common/UpdateProbability/${id}`).subscribe((res) => {
      this.probabilityForm.patchValue({ description: res.data.description });
      this.currentProbabilityId = id;
    });
  }

  deleteapi(id: number): void {
    this.http.getapi(`api/Common/DeleteProbability/${id}`).subscribe(() => {
      this.getapi();
    });
  }

  resetForm(): void {
    this.probabilityForm.reset();
    this.currentProbabilityId = null;
  }
}