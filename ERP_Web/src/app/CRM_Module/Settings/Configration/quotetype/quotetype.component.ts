import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  quotetypeId: any;
  submitted: any;

  constructor(
    private fb: FormBuilder,
    private http: BackendService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute) {
    this.ActivatedRoute.queryParamMap.subscribe((params) => {
      this.quotetypeId = params.get('quotetypeid');
      console.log(this.quotetypeId);
      if (this.quotetypeId > 0) {
        this.getQuotetypeById(this.quotetypeId)
      }
    });

  }

  ngOnInit(): void {
    this.quotetypeForm = this.fb.group({
      id: [0],
      description: [null, Validators.required]
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
  submitForm(): void {
    this.submitted = true;
    console.log(this.quotetypeForm.value);
    const _ID = this.quotetypeForm.value.id
    if (this.quotetypeForm.invalid) {
      return;
    }
    if (_ID > 0) {
      this.http.putapi(`api/Common/UpdateQuoteType`, this.quotetypeForm.value).subscribe((res) => { 
        this.clear();
      }, (error) => {
        console.error('Error updating quotetype', error);
      });
    } else {
      this.http.postapi('api/Common/AddQuotetype', this.quotetypeForm.value).subscribe(() => { 
        this.clear();
      }, (error) => {
        console.error('Error adding quotetype', error);
      });
    }
  }
  getQuotetypeById(id: any) {
    this.http.getapi('api/Common/GetQuoteTypeBy/' + id).subscribe((res) => {
      console.log(res);
      this.quotetypeForm.patchValue(res.data);
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.quotetypeForm.controls;
  }

  deleteQuotetype(id: number): void {
    this.http.deleteapi(`api/Common/DeleteQuoteType/${id}`).subscribe(() => {
      console.log('Quotetype deleted successfully');
      this.getapi();
    }, (error) => {
      console.error(`Error deleting quotetype with id ${id}`, error);
    });
  }

  clear(): void {
    this.submitted = false;
    this.quotetypeForm.reset();
    this.ngOnInit()
    this.router.navigate(['/CRM/Settings/quote-type']);
  }
}
