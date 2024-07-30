import { Component } from '@angular/core';
import { ExcelreadService } from '../../../Services/Excel/excelread.service';

@Component({
  selector: 'app-revenueby-monthuarterear',
  templateUrl: './revenueby-monthuarterear.component.html',
  styleUrl: './revenueby-monthuarterear.component.css'
})
export class RevenuebyMonthuarterearComponent {
  fromDate: any | undefined;
  toDate: any | undefined;
  reportData: any[] = [];
  revenueData = []
  constructor(
    private excelRead: ExcelreadService,
  ) {
  }

  onSearch() {
    // Implement search functionality here
    // For example, fetch the report data based on fromDate and toDate
  }

  onClear() {
    this.fromDate = '';
    this.toDate = '';
    this.reportData = [];
    // Reset report data or fetch initial data here
  }
  downloadReport() {
    this.excelRead.exportAsExcelFile(this.revenueData, 'revenueby-monthuarterear')
  }
  listofdealswon(listofdealswon: any, arg1: string) {
    throw new Error('Method not implemented.');
  }
}