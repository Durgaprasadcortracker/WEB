import { Component } from '@angular/core';

@Component({
  selector: 'app-sms-campagins',
  templateUrl: './sms-campagins.component.html',
  styleUrl: './sms-campagins.component.css'
})
export class SmsCampaginsComponent {
public message: string = ' ';
public maxCharCount : number = 200;

// phoneNumber: number;
// textMessage: string;

// constructor(private toast: AbortController, public navCtrl: NavController) {

// async sendTextMessage() {
// try {
// await SMS.send('0129219', "Odr message');
// const toast = this.toast.create({
//  message: 'Text was sent!',
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
