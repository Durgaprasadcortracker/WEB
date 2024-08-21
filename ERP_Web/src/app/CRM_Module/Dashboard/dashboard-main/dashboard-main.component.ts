import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.css'
})
export class DashboardMainComponent implements OnInit {
  tableData = [
    { name: 'Tailor', stage1: 6, stage2: 9, stage3: 0, stage4: 16, stage5: 4, stage6: 14 },
    { name: 'Jamie', stage1: 12, stage2: 8, stage3: 7, stage4: 10, stage5: 5, stage6: 11 },
    { name: 'Casey', stage1: 5, stage2: 7, stage3: 6, stage4: 9, stage5: 8, stage6: 10 },
    { name: 'Dakota', stage1: 8, stage2: 6, stage3: 5, stage4: 12, stage5: 9, stage6: 7 },
    { name: 'Riley', stage1: 10, stage2: 5, stage3: 8, stage4: 11, stage5: 6, stage6: 9 },
    { name: 'Jordan', stage1: 7, stage2: 10, stage3: 4, stage4: 14, stage5: 7, stage6: 8 },
  ];

  reminders = [
    { title: 'Reminder 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget purus eu urna tempor placerat.' },
    { title: 'Reminder 2', content: 'Nulla facilisi. Proin vitae justo non nunc lacinia congue sed sit amet libero.' },
    { title: 'Reminder 3', content: 'Etiam eget justo quis velit fermentum dictum. Integer convallis consectetur felis vel efficitur.' },
  ];

  leads: any;
  chart: any;

  constructor(
    private http: BackendService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.http.getapi('api/Common/Revenue').subscribe(
      (res: any) => {
        this.leads = res; // Assuming the API returns an array of leads
        this.createChart();
      },
      (error) => {
        console.error('Error fetching data', error);
        // this.snackBar.open('Failed to load data', 'Close', {
        //   duration: 3000,
        // });
      }
    );
  }


  createChart(): void {
    const groupedData = this.groupBy(this.leads, 'leadStage');
    const stages = Object.keys(groupedData);
    const totalRevenues = stages.map(stage => {
      return groupedData[stage].reduce((sum, lead) => sum + (lead.annualRevenue || 0), 0);
    });

    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: stages,
        datasets: [
          {
            label: 'Total Annual Revenue',
            data: totalRevenues,
            backgroundColor: '#3071D6',
            borderColor: '#3071D6',
            borderWidth: 1,
          }
        ]
      },
      options: {
        scales: {
          x: {
            ticks: {
              font: {
                size: 15
              }
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 15
              }
            }
          }
        }
      }
    });
  }

  groupBy(array: any[], key: string): { [key: string]: any[] } {
    return array.reduce((result, currentValue) => {
      const groupKey = currentValue[key];
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(currentValue);
      return result;
    }, {} as { [key: string]: any[] });
  }
  
}


  // ngOnInit(): void {
  //   this.initializeCharts();
  //   this.fetchStatusCounts();
  // }

  // initializeCharts(): void {
   
  // }
  // @ViewChild('statusPieChart') statusPieChart!: ElementRef<HTMLCanvasElement>;
  // activeCount: number = 0;
  // inactiveCount: number = 0;
  // isLoading: boolean = false;
  // error: string | null = null;


  // constructor(private http: BackendService,
  //   private snackBar: MatSnackBar,
  //   private router: Router) { }


 

  // fetchStatusCounts(): void {
  //   this.isLoading = true;
  //   const activeCountRequest = this.http.getapi(`${this.apiUrl}/GetActiveStatusCount`);
  //   const inactiveCountRequest = this.http.getapi(`${this.apiUrl}/GetInactiveStatusCount`);

  //   forkJoin([activeCountRequest, inactiveCountRequest]).subscribe({
  //     next: ([activeCount, inactiveCount]) => {
  //       this.activeCount = activeCount;
  //       this.inactiveCount = inactiveCount;
  //       this.updateChart();
  //     },
  //     error: (error) => {
  //       this.handleError(error);
  //     }
  //   });
  // }

  // updateChart(): void {
  //   this.isLoading = false;
  //   const ctx = this.statusPieChart.nativeElement.getContext('2d');
  //   if (ctx) {
  //     new Chart(ctx, {
  //       type: 'pie',
  //       data: {
  //         labels: ['Active', 'Inactive'],
  //         datasets: [{
  //           label: 'Status Counts',
  //           data: [this.activeCount, this.inactiveCount],
  //           backgroundColor: ['#2C81C5', '#E55374']
  //         }]
  //       }
  //     });
  //   }
  // }

  // handleError(error: any): void {
  //   this.isLoading = false;
  //   console.error('An error occurred:', error);
  //   switch (error.status) {
  //     case 0:
  //       this.error = 'Unable to reach server. Please try again later.';
  //       break;
  //     case 404:
  //       this.error = 'Data not found.';
  //       break;
  //     case 500:
  //       this.error = 'Server error. Please try again later.';
  //       break;
  //     default:
  //       this.error = 'An unexpected error occurred. Please try again later.';
  //       break;
  //   }
  // }
// }
