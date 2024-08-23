import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-companies-info',
  templateUrl: './companies-info.component.html',
  styleUrl: './companies-info.component.css'
})
export class CompaniesInfoComponent {
  id: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
  }

}
