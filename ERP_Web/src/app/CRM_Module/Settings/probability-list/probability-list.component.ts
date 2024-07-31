import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-probability-list',
  templateUrl: './probability-list.component.html',
  styleUrl: './probability-list.component.css'
})
export class ProbabilityListComponent {
  ProbabilityId: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  Probabilitylist: any = [];

  constructor(private http:BackendService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ){
    this.ActivatedRoute.queryParamMap.subscribe((params) => {
      this.ProbabilityId = params.get('timezoneId');
    });
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
      this.snackBar.open('Probability Updated successfully!', 'Close', {
           duration: 3000, // Snackbar stays open for 3 seconds
         });
    }, (error) => {
      console.error('Error fetching probability by ID', error);
    });
  }

  deleteProbability(id: number): void {
    this.http.deleteapi(`api/Common/DeleteProbability/${id}`).subscribe(() => {
      console.log('Probability deleted successfully');
      this.getProbabilities();
      this.snackBar.open('Probability Deleted successfully!', 'Close', {
           duration: 3000, // Snackbar stays open for 3 seconds
         });
    }, (error) => {
      console.error(`Error deleting probability with id ${id}`, error);
    });
  }

  onTableDataChange(event: any): void {
    this.page = event;
    this.getProbabilities();
  }
  // onTableSizeChange(event: any): void {
  //   this.tableSize = event.target.value;
  //   this.page = 1;
  //   this.getProbabilities();
  // }
  getProbabilities(): void {
    this.http.getapi('api/Common/GetProbality').subscribe((res) => {
      this.Probabilitylist = res.data;
      this.count = res.data.length;
      console.log();
    }, (error) => {
      console.error('Error fetching probabilities', error);
    });
  }

  getSerialNumber(index: number): number {
    return (this.page - 1) * this.tableSize + index + 1;
  }
}

