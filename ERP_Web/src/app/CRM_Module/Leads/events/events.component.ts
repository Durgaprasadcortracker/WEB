import { Component, OnInit } from '@angular/core';

interface Event {
  title: string;
  time: string;
  guests: string;
  meetingLink: string;
  location: string;
  date: string;
}

interface CalendarDay {
  date: number;
  isCurrent: boolean;
  isToday: boolean;
  events: Event[];
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  editor: any;
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  currentMonth: number;
  currentYear: number;
  calendarDays: CalendarDay[];
  allEvents: Event[] = [];

  constructor() {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
    this.calendarDays = [];
  }

  ngOnInit(): void {
    this.generateCalendarDays();
  }

  generateCalendarDays(): void {
    this.calendarDays = [];

    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
    const firstDayIndex = firstDayOfMonth.getDay();
    const lastDayIndex = lastDayOfMonth.getDate();

    const today = new Date();

    for (let i = 0; i < firstDayIndex; i++) {
      this.calendarDays.push({ date: 0, isCurrent: false, isToday: false, events: [] });
    }

    for (let i = 1; i <= lastDayIndex; i++) {
      const isToday = i === today.getDate() && this.currentMonth === today.getMonth() && this.currentYear === today.getFullYear();
      this.calendarDays.push({ date: i, isCurrent: true, isToday, events: [] });
    }

    const remainingDays = 42 - this.calendarDays.length;
    for (let i = 0; i < remainingDays; i++) {
      this.calendarDays.push({ date: 0, isCurrent: false, isToday: false, events: [] });
    }
  }

  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendarDays();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendarDays();
  }

  selectDay(day: CalendarDay): void {
    if (day.isCurrent) {
      const eventTitle = prompt('Enter event title:');
      const eventTime = prompt('Enter event time:');
      const eventGuests = prompt('Enter event guests:');
      const eventMeetingLink = prompt('Enter event meeting link:');
      const eventLocation = prompt('Enter event location:');

      if (eventTitle && eventTime && eventGuests && eventMeetingLink && eventLocation) {
        const eventDate = `${day.date} ${this.months[this.currentMonth]} ${this.currentYear}`;
        const newEvent: Event = {
          title: eventTitle,
          time: eventTime,
          guests: eventGuests,
          meetingLink: eventMeetingLink,
          location: eventLocation,
          date: eventDate
        };

        day.events.push(newEvent);
        this.allEvents.push(newEvent);
      }
    }
  }


  editEvent(event: Event) {
    // Placeholder method for editing an event; implement your logic here
    console.log('Edit event:', event);
    // You can implement a modal or a separate edit form here
}

deleteEvent(event: Event) {
  // Delete the event from allEvents
  const index = this.allEvents.indexOf(event);
  if (index !== -1) {
      this.allEvents.splice(index, 1);
  }

  // Delete the event from the corresponding calendar day
  this.calendarDays.forEach(day => {
      day.events = day.events.filter(e => e !== event);
  });
}
}