import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit, OnDestroy {
  tableData = [
    { name: 'Tailor', stage1: 6, stage2: 9, stage3: 0, stage4: 16, stage5: 4, stage6: 14 },
    { name: 'Jamie', stage1: 12, stage2: 8, stage3: 7, stage4: 10, stage5: 5, stage6: 11 },
    { name: 'Casey', stage1: 5, stage2: 7, stage3: 6, stage4: 9, stage5: 8, stage6: 10 },
    { name: 'Dakota', stage1: 8, stage2: 6, stage3: 5, stage4: 12, stage5: 9, stage6: 7 },
    { name: 'Riley', stage1: 10, stage2: 5, stage3: 8, stage4: 11, stage5: 6, stage6: 9 },
    { name: 'Jordan', stage1: 7, stage2: 10, stage3: 4, stage4: 14, stage5: 7, stage6: 8 },
  ];

  dropdownVisible = false;

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  closeDropdown() {
    this.dropdownVisible = false;
  }

  reminders = [
    { title: 'Reminder 1', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget purus eu urna tempor placerat.' },
    { title: 'Reminder 2', content: 'Nulla facilisi. Proin vitae justo non nunc lacinia congue sed sit amet libero.' },
    { title: 'Reminder 3', content: 'Etiam eget justo quis velit fermentum dictum. Integer convallis consectetur felis vel efficitur.' },
  ];

  selectedPeriod: string = 'month';
  chart: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Only run in the browser
      this.loadApexCharts();
    }
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  loadApexCharts() {
    import('apexcharts').then((ApexCharts) => {
      this.renderChart(ApexCharts.default);
    });
  }

  renderChart(ApexCharts: any, data: number[] = [35000, 45000, 25000], categories: string[] = ['Jan', 'Feb', 'Mar']) {
    if (this.chart) {
      this.chart.destroy();
    }

    const options = {
      chart: {
        type: 'bar',
        height: 400,
        width: '100%',
        toolbar: {
          show: false 
        }
      },
      series: [
        {
          name: 'Sales',
          data: data
        }
      ],
      xaxis: {
        categories: categories
      },
      colors: ['#FFA500'],
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'left', 
        markers: {
          width: 12,
          height: 12,
          radius: 12
        }
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return `Sales: ${val.toLocaleString()}`;
          },
          title: {
            formatter: function (seriesName: string, opts: any) {
              return categories[opts.dataPointIndex] + ' 2024';
            }
          }
        }
      }
    };

    this.chart = new ApexCharts(document.querySelector('#chart'), options);
    this.chart.render();
  }

  updateChart() {
    let data: number[] = [];
    let categories: string[] = [];

    if (this.selectedPeriod === 'month') {
      data = [35820, 45820, 25820];
      categories = ['Mar', 'May', 'Jun'];
    } else if (this.selectedPeriod === 'quarter') {
      data = [350000, 450000, 250000];
      categories = ['Q1', 'Q2', 'Q3'];
    } else if (this.selectedPeriod === 'year') {
      data = [1200000, 1500000, 900000];
      categories = ['2021', '2022', '2023'];
    }

    if (isPlatformBrowser(this.platformId)) {
      this.loadApexCharts();
    }
  }
}
