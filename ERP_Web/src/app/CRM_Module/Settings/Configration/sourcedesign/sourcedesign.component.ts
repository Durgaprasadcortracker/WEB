import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sourcedesign',
  templateUrl: './sourcedesign.component.html',
  styleUrl: './sourcedesign.component.css'
})

export class SourcedesignComponent implements OnInit {
  sourceForm: any;
  SourceList: any;
  currentSourceId = 0;

  constructor(private fb: FormBuilder, private http: BackendService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.sourceId = params.get('sourceid');
    });

    this.sourceForm = this.fb.group({
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.sourceForm = new FormGroup({
      id: new FormControl(<Number>(0)),
      description: new FormControl('')
    });
    this.getapi();
  }

  getapi(): void {
    this.http.getapi('api/Common/GetSource').subscribe((res) => {
      this.SourceList = res.data;
    }, (error) => {
      console.error('Error fetching sources', error);
    });
  }
  Id:any;
  submitForm(): void {
    const description = this.sourceForm.get('description')?.value;
    this.sourceForm.get("id").setValue(this.currentSourceId);
    if (this.currentSourceId > 0) {
      this.http.putapi(`api/Common/UpdateSource`, this.sourceForm.getRawValue()).subscribe((res) => {
        console.log('Source updated successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error updating source', error);
      });
    } else {
      this.http.postapi('api/Common/SaveSource', { description }).subscribe(() => {
        console.log('Source added successfully');
        this.getapi();
        this.resetForm();
      }, (error) => {
        console.error('Error adding source', error);
      });
    }
  }

  sourceId: any;
  edit(id: number): void {
    this.currentSourceId = id;
    this.getSourceById();
  }

  getSourceById() {
    this.http.getapi('api/Common/GetSourceDetails/' + this.currentSourceId).subscribe((res) => {
      console.log(res);
      this.sourceForm.get("sourceId")?.setValue(res.data.sourceId);
      this.sourceForm.get("description")?.setValue(res.data.description);
    });
  }

  deleteSource(id: number): void {
    this.http.deleteapi(`api/Common/DeleteSource/${id}`).subscribe(() => {
      console.log('Source deleted successfully');
      this.getapi();
    }, (error) => {
      console.error(`Error deleting source with id ${id}`, error);
    });
  }

  resetForm(): void {
    this.sourceForm.reset();
    this.currentSourceId = 0;
  }

}
