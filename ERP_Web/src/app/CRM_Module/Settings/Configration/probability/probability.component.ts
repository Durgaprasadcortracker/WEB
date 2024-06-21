import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-probability',
  templateUrl: './probability.component.html',
  styleUrls: ['./probability.component.css']
})
export class ProbabilityComponent implements OnInit {
  probabilityForm:any;
 
  Probabilitylist: any;
  currentProbabilityId = 0;

  constructor(private fb: FormBuilder, private http: BackendService, private router: Router,private activatedRoute:ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.probabilityId = params.get('probabilityid');
    });

    this.probabilityForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getstagevalues();
    this.probabilityForm=new FormGroup({
      id:new FormControl(<Number>(0)),
      description:new FormControl('')
    });
    this.getapi();
    
  }

  getapi(): void {
    this.http.getapi('api/Common/GetProbality').subscribe((res) => {
      this.Probabilitylist = res.data;
    }, (error) => {
      console.error('Error fetching probabilities', error);
    });
  }
  stageList:any;
  getstagevalues(): void {
    this.http.getapi('api/Common/GetStages').subscribe((res) => {
      this.stageList = res.data;
    }, (error) => {
      console.error('Error fetching probabilities', error);
    });
  }
Id:any;
  submitForm(): void {
    const description = this.probabilityForm.get('description')?.value;
    this.probabilityForm.get("id").setValue(this.probabilityId);
    if (this.probabilityId > 0) {
      this.http.putapi(`api/Common/UpdateProbability`, this.probabilityForm.getRawValue()).subscribe((res) => {
        console.log('Probability updated successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error updating probability', error);
      });
      
    } else {
      this.http.postapi('api/Common/AddProbality', { description }).subscribe(() => {
        console.log('Probability added successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error adding probability', error);
      });
     
    }
  }
  probabilityId:any;
  edit(id: number): void {
    this.probabilityId = id;
    this.getProbabilityById();
  }
  getProbabilityById(){
    this.http.getapi('api/Common/GetProbabilityById/'+this.probabilityId).subscribe((res) => {
      console.log(res);
      debugger;
      this.probabilityForm.get("probabilityId")?.setValue(res.data.stageId);
      
      this.probabilityForm.get("description")?.setValue(res.data.description);
     
    });
    }

  deleteProbability(id: number): void {
    this.http.deleteapi(`api/Common/DeleteProbability/${id}`).subscribe(() => {
      console.log('Probability deleted successfully');
      this.getapi();
    }, (error) => {
      console.error(`Error deleting probability with id ${id}`, error);
    });
  }

  resetForm(): void {
    this.probabilityForm.reset();
    this.currentProbabilityId = 0;
  }
}