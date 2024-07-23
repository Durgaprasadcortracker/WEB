import { Component } from '@angular/core';
import { BackendService } from '../../../../Services/BackendConnection/backend.service';

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

  constructor(private backendservice : BackendService) { }

sendSms() {
  this.backendservice.sendSms(this.phoneNumber).subscribe(
    response => {
      this.responseMessage = 'SMS sent successfully! Message SID: ' + response.message;
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
