import { Component } from '@angular/core';
import {AbstractControl,FormBuilder,FormGroup,Validators,} from '@angular/forms';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css'
})
export class CountryListComponent {
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [20, 40, 60, 80];
  p: number = 1;
  submited: any;

  cities: any;
  states: any;

  countrylist: any;
  countryid: any;
  country: any;
  countryForm: any;

  constructor(
    private fb: FormBuilder,
    private http: BackendService,
    private router: Router,
    private ActivatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    
  }

  ngOnInit(): void {
    this.getCountries();
   
    
  }
  getCountries(): void {
    this.http.getapi('api/Common/GetCountries').subscribe(
      (res) => {
        console.log(res);
        this.countrylist = res.data;
      },
      (error) => {
        console.error('Error fetching Countries', error);
      }
    );
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.getCountries();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getCountries();
  }



  get f(): { [key: string]: AbstractControl } {
    return this.countryForm.controls;
  }

  deleteCountry(id: number): void {
    this.http.deleteapi(`api/Common/DeleteCountry/${id}`).subscribe(
      () => {
        console.log('Country deleted successfully');
        this.ngOnInit();
        this.getCountries();
        this.snackBar.open('Country Deleted successfully!', 'Close', {
          duration: 3000, // Snackbar stays open for 3 seconds
        });
      },
      (error) => {
        console.error(
          `Error deleting city with id 
          ${id}`,
          error
        );
      }
    );
  }
  resetForm(): void {
    this.countryForm.reset({ id: 0, description: '' });
    this.countryid = 0;
  }
  edit(Id: any) {
    this.router.navigate(['/CRM/edit country', Id]);
  }
}
