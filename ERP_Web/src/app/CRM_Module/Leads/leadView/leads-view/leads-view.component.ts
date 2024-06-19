import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leads-view',
  templateUrl: './leads-view.component.html',
  styleUrl: './leads-view.component.css'
})
export class LeadsViewComponent {
  id: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
  }

}
