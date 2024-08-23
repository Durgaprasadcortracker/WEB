import { Component } from '@angular/core';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sms-campagins',
  templateUrl: './sms-campagins.component.html',
  styleUrl: './sms-campagins.component.css'
})
export class SmsCampaginsComponent {
public message: string = '';
public maxCharCount : number = 200;
phoneNumber: string = '';
messageBody: string = '';
responseMessage: string = '';

  constructor(private backendservice : BackendService,
    private snackBar: MatSnackBar,
  ) { }

sendSms() {
  this.backendservice.sendSms(this.phoneNumber).subscribe(
    response => {
      this.responseMessage = 'SMS sent successfully! Message SID: ' + response.message;
      this.snackBar.open('SMS successfully Sent!', 'Close', {
        duration: 3000, // Snackbar stays open for 3 seconds
      });
    },
    
    error => {
      this.responseMessage = 'Failed to send SMS.';
    }
    
  );

// phoneNumber: number;
// textMessage: string;

// constructor(private toast: AbortController, public navCtrl: NavController) {

// async sendTextMessage() {
// try {
// await SMS.send('0129219', "Odr message');
// const toast = this.toast.create({
// message: 'Text was sent!',
// duration: 3000
// });
// toast.present();
// }
// catch (e) {
// const toast = this.toast.create({
// message: 'Text was not sent!',
// duration: 3000
// });
// toast.present();
// }
// }
// }

}
}
