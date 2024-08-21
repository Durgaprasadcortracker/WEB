// import { Component } from '@angular/core';
// import { BackendService } from '../../../Services/BackendConnection/backend.service';

// @Component({
//   selector: 'app-reminders-dashboard',
//   templateUrl: './reminders-dashboard.component.html',
//   styleUrl: './reminders-dashboard.component.css'
// })
// export class RemindersDashboardComponent {
//   page: number = 1;
//   count: number = 0;
//   tableSize: number = 5;
//   tableSizes: any = [3, 6, 9, 12];
//   p:number=1;


//   remindersList: any
//   id: any;
//   open = 1;
//   contactsList: any;
//   calltypeslist: any;
//   myForm: any;
//   submitted: any;
//   reminder: any;


//   constructor(
//     private http: BackendService,
//   ) {
//   }

//   ngOnInit() {
//     this.getRequiredData()
//   }
//   getRequiredData() {
//     this.http.getapi('api/Lead/GetAllReminder').subscribe((res) => {
//       console.log(res);
//       if (res) {
//         this.remindersList = res
//       }
//     });
//   }

// }





import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../Services/BackendConnection/backend.service';

@Component({
  selector: 'app-reminders-dashboard',
  templateUrl: './reminders-dashboard.component.html',
  styleUrls: ['./reminders-dashboard.component.css']
})
export class RemindersDashboardComponent implements OnInit {
  remindersList: any[] = [];
  filteredRemindersList: any[] = [];
  selectedDate: string = '';
  selectedTime: string = '';

  constructor(private http: BackendService) {}

  ngOnInit() {
    this.getRequiredData();
  }

  getRequiredData() {
    this.http.getapi('api/Lead/GetAllReminder').subscribe((res: any[]) => {
      if (res) {
        this.remindersList = res;
        this.filteredRemindersList = this.remindersList; // Initialize with all reminders
      }
    });
  }

  showTodayReminders() {
    const today = new Date().toISOString().split('T')[0];
    this.filteredRemindersList = this.remindersList
      .filter(r => r.reminderDate === today)
      .sort((a, b) => {
        const timeA = new Date(`${a.reminderDate}T${a.reminderTime}`).getTime();
        const timeB = new Date(`${b.reminderDate}T${b.reminderTime}`).getTime();
        return timeA - timeB;
      });
  }

  filterByDate() {
    if (this.selectedDate) {
      this.filteredRemindersList = this.remindersList
        .filter(r => r.reminderDate === this.selectedDate)
        .sort((a, b) => {
          const timeA = new Date(`${a.reminderDate}T${a.reminderTime}`).getTime();
          const timeB = new Date(`${b.reminderDate}T${b.reminderTime}`).getTime();
          return timeA - timeB;
        });
    } else {
      this.filteredRemindersList = this.remindersList; // Reset if no date selected
    }
  }

  filterByTime() {
    if (this.selectedTime) {
      this.filteredRemindersList = this.remindersList
        .filter(r => r.reminderTime === this.selectedTime)
        .sort((a, b) => {
          const dateA = new Date(`${a.reminderDate}T${a.reminderTime}`).getTime();
          const dateB = new Date(`${b.reminderDate}T${b.reminderTime}`).getTime();
          return dateA - dateB;
        });
    } else {
      this.filteredRemindersList = this.remindersList; // Reset if no time selected
    }
  }
}


