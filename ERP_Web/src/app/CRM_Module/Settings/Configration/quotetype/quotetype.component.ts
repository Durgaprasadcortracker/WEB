import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quotetype',
  templateUrl: './quotetype.component.html',
  styleUrl: './quotetype.component.css'
})
export class QuotetypeComponent implements OnInit {
  quotetypeForm: any;
  QuotetypeList: any;
  currentQuotetypeId = 0;

  constructor(private fb: FormBuilder, private http: BackendService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.quotetypeId = params.get('quotetypeid');
    });

    this.quotetypeForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.quotetypeForm = this.fb.group({
      id: new FormControl(<Number>(0)),
      description: new FormControl('')
    });
    this.getapi();
  }

  getapi(): void {
    this.http.getapi('api/Common/GetQuoteType').subscribe((res) => {
      this.QuotetypeList = res.data;
    }, (error) => {
      console.error('Error fetching quotetypes', error);
    });
  }
  Id:any;
  submitForm(): void {
    const description = this.quotetypeForm.get('description')?.value;
    this.quotetypeForm.get("id").setValue(this.currentQuotetypeId);
    if (this.currentQuotetypeId > 0) {
      this.http.putapi(`api/Common/UpdateQuoteType`, this.quotetypeForm.getRawValue()).subscribe((res) => { // Updated from UpdateCalltype
        console.log('Quotetype updated successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error updating quotetype', error);
      });
    } else {
      this.http.postapi('api/Common/AddQuotetype', { description }).subscribe(() => { // Updated from SaveCalltype
        console.log('Quotetype added successfully');
        this.getapi(); 
        this.resetForm();
      }, (error) => {
        console.error('Error adding quotetype', error);
      });
    }
  }

  quotetypeId: any;
  edit(id: number): void {
    this.currentQuotetypeId = id;
    this.getQuotetypeById();
  }

  getQuotetypeById() {
    this.http.getapi('api/Common/GetQuotetypeDetails/' + this.currentQuotetypeId).subscribe((res) => { 
      console.log(res);
      this.quotetypeForm.get("id")?.setValue(res.data.quotetypeId);
      this.quotetypeForm.get("description")?.setValue(res.data.description);
    });
  }

  deleteQuotetype(id: number): void {
    this.http.deleteapi(`api/Common/DeleteQuoteType/${id}`).subscribe(() => {
      console.log('Quotetype deleted successfully');
      this.getapi();
    }, (error) => {
      console.error(`Error deleting quotetype with id ${id}`, error);
    });
  }

  resetForm(): void {
    this.quotetypeForm.reset();
    this.currentQuotetypeId = 0;
  }
}
