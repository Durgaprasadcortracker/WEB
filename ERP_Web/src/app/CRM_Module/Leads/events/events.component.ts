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
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
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
    this.getEvents();
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
    this.getEvents();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendarDays();
    this.getEvents();
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

        this.addEvent(newEvent);
      }
    }
  }

  getEvents(): void {
    // Placeholder for fetching events from a data source (e.g., API, local storage)
    // For now, let's assume we have some static events
    const staticEvents: Event[] = [
      {
        title: 'Meeting with Bob',
        time: '10:00 AM',
        guests: 'Bob, Alice',
        meetingLink: 'http://example.com/meeting',
        location: 'Conference Room',
        date: '10 June 2024'
      },
      {
        title: 'Project Deadline',
        time: '5:00 PM',
        guests: 'Team',
        meetingLink: '',
        location: 'Office',
        date: '15 June 2024'
      }
    ];

    this.allEvents = staticEvents;
    this.calendarDays.forEach(day => {
      day.events = this.allEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getDate() === day.date &&
               eventDate.getMonth() === this.currentMonth &&
               eventDate.getFullYear() === this.currentYear;
      });
    });
  }

  addEvent(event: Event): void {
    const eventDate = new Date(event.date);
    if (eventDate.getMonth() === this.currentMonth && eventDate.getFullYear() === this.currentYear) {
      const day = this.calendarDays.find(d => d.date === eventDate.getDate());
      if (day) {
        day.events.push(event);
      }
    }
    this.allEvents.push(event);
  }

  editEvent(event: Event): void {
    const eventTitle = prompt('Edit event title:', event.title);
    const eventTime = prompt('Edit event time:', event.time);
    const eventGuests = prompt('Edit event guests:', event.guests);
    const eventMeetingLink = prompt('Edit event meeting link:', event.meetingLink);
    const eventLocation = prompt('Edit event location:', event.location);

    if (eventTitle && eventTime && eventGuests && eventMeetingLink && eventLocation) {
      event.title = eventTitle;
      event.time = eventTime;
      event.guests = eventGuests;
      event.meetingLink = eventMeetingLink;
      event.location = eventLocation;

      // Update the calendarDays array to reflect the edited event
      this.calendarDays.forEach(day => {
        day.events = day.events.map(e => e === event ? event : e);
      });
    }
  }

  deleteEvent(event: Event): void {
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
