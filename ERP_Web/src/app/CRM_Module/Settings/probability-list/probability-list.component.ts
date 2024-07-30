import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-probability-list',
  templateUrl: './probability-list.component.html',
  styleUrl: './probability-list.component.css'
})
export class ProbabilityListComponent {
  Probabilitylist:any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  p:number=1;
  constructor(private http:BackendService){

  }
  ngOnInit(){
    this.getProbabilities();
  }
  currentProbabilityId:any;
  edit(id: number): void {
    this.currentProbabilityId = id;
    this.getProbabilityById();
  }
  getProbabilityById(): void {
    this.http.getapi(`api/Common/GetProbabilityById/${this.currentProbabilityId}`).subscribe((res) => {
      const probability = res.data;
     
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

  onTableDataChange(event: any) {
    this.page = event;
    this.getProbabilities();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getProbabilities();
  }
  getProbabilities(): void {
    this.http.getapi('api/Common/GetProbality').subscribe((res) => {
      this.Probabilitylist = res.data;
    }, (error) => {
      console.error('Error fetching probabilities', error);
    });
  }
}
