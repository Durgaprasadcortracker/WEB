import { Component } from '@angular/core';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { ExcelreadService } from '../../../../Services/Excel/excelread.service';

@Component({
  selector: 'app-bulk-upload-main',
  templateUrl: './bulk-upload-main.component.html',
  styleUrl: './bulk-upload-main.component.css'
})
export class BulkUploadMainComponent {

  constructor(private http: BackendService,
    // private excelRead: ExcelreadService
  ) {}

  downloadFile() {
    const link = document.createElement('a');
    link.href = `ERP_Web\public\files\Company_Bulk_Upload.xlsx`;  // Replace with your file path
    link.download = 'Companys_Bulk_Upload.xlsx'; // Set the downloaded filename (optional)
    document.body.appendChild(link); // Append to body for browser handling
    link.click();
    link.remove();
  }
  onFileSelected(event: any) {
    // const file = event.target.files[0];
    // if (file) {
    //   this.excelRead.readExcel(file)
    //     .then((data:any) => {
    //       console.log(data);
    //       // this.uploadedData = data;
    //       // this.uploadPage = 1
    //     })
    //     .catch((error:any) => {
    //       console.error(error);
    //     });
    // }
  }

}
