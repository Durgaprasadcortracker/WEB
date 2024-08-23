export class Meeting {
    title: string;
    time: string;
    guests: string;
    meetingLink: string;
    location: string;
    date: string;
  
    constructor(title: string, time: string, guests: string, meetingLink: string, location: string, date: string) {
      this.title = title;
      this.time = time;
      this.guests = guests;
      this.meetingLink = meetingLink;
      this.location = location;
      this.date = date;
    }
  }
  