import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { Router, ActivatedRoute } from '@angular/router';
import { identity } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-quotetypes',
  templateUrl: './quotetypes.component.html',
  styleUrl: './quotetypes.component.css'
})
export class QuotetypesComponent implements OnInit {
quotetypeForm: any;
quotetypeList: any;
curretquotetypeId = 0;

constructor(private fb: FormBuilder, private http: BackendService, private router: Router, private activatedRoute: ActivatedRoute) {
  this.activatedRoute.queryParamMap.subscribe((params) => {
    this.quotetypeId = params.get(this.quotetypeId);
});
this.quotetypeForm = this.fb.group({
  description: ['', Validators.required]
});
}
ngOnInit(): void {
  this.quotetypeForm = this.fb.group({
    id: new FormControl(<number>(0)) ,
    description: new FormControl('')
  });
  this.getapi();
}
getapi (): void {
  this.http.getapi('api/Common/GetQoutetypes').subscribe((res) => {
this.quotetypeList = res.data;
  }, (error) => {
    console.error('Error fetching quotetypes', error)
  });
}
Id:any;
submitForm(): void {
  const description = this.quotetypeForm.get('description')?.value;
  this.quotetypeForm.get("id").setValue(this.curretquotetypeId); 
  if (this.curretquotetypeId > 0) {
    this.http.putapi(`api/Common/UpdateQuotetype`, this.quotetypeForm.getRawValue()).subscribe((res) => { // Updated endpoint from UpdateSource to UpdateQuotetype
      console.log('Quotetype updated successfully');
      this.getapi();
      this.resetForm();
    }, (error) => {
      console.error('Error updating quotetype', error);
    });
  } else {
    this.http.postapi('api/Common/AddQuotetype', { description }).subscribe(() => { // Updated endpoint from SaveSource to SaveQuotetype
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
  this.curretquotetypeId = id;
  this.getQuotetypeById();
}

getQuotetypeById() {
  this.http.getapi('api/Common/GetQuotetype/' + this.curretquotetypeId).subscribe((res) => {
    console.log(res);
    this.quotetypeForm.get("id")?.setValue(res.data.quotetypeId);
    this.quotetypeForm.get("description")?.setValue(res.data.description);
  });
}

deleteQuotetype(id: number): void { 
  this.http.deleteapi(`api/Common/Quotetype/${id}`).subscribe(() => { 
    console.log('Quotetype deleted successfully');
    this.getapi();
  }, (error) => {
    console.error(`Error deleting quotetype with id ${id}`, error);
  });
}

resetForm(): void {
  this.quotetypeForm.reset();
  this.curretquotetypeId = 0;
}
}

