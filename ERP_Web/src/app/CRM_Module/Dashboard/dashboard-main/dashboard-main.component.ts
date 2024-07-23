import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
    // Revenue Chart
    // new Chart('revenueChart', {
    //   type: 'bar',
    //   data: {
    //     labels: ['January', 'February', 'March', 'April'],
    //     datasets: [{
    //       label: 'Sales',
    //       data: [30000, 45000, 28000, 60000],
    //       backgroundColor: 'orange',
    //     }]
    //   },
    //   options: {
    //     responsive: true,
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // });

    // Deals Chart
    // new Chart('dealsChart', {
    //   type: 'pie',
    //   data: {
    //     labels: ['Active Deals', 'Inactive Deals'],
    //     datasets: [{
    //       data: [70, 30],
    //       backgroundColor: ['blue', 'red'],
    //     }]
    //   },
    //   options: {
    //     responsive: true
    //   }
    // });

    // Stage Chart
    // new Chart('stageChart', {
    //   type: 'bar',
    //   data: {
    //     labels: ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4', 'Stage 5', 'Stage 6'],
    //     datasets: [{
    //       label: 'Sales',
    //       data: [300000, 450000, 280000, 600000, 350000, 500000],
    //       backgroundColor: 'blue',
    //     }]
    //   },
    //   options: {
    //     responsive: true,
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // });
  }
}
