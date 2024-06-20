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
  selectedEvent: Event | null = null;
  originalEvent: Event | null = null;

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

  editEvent(event: Event): void {
    this.selectedEvent = { ...event };
    this.originalEvent = event;
  }

  deleteEvent(event: Event): void {
    // Remove from allEvents
    this.allEvents = this.allEvents.filter(e => e !== event);

    // Remove from calendarDays
    this.calendarDays.forEach(day => {
      day.events = day.events.filter(e => e !== event);
    });

    // If currently editing, cancel edit
    if (this.selectedEvent === event) {
      this.cancelEdit();
    }
  }

  updateEvent(): void {
    if (this.originalEvent && this.selectedEvent) {
      const updatedEvent: Event = {
        title: this.selectedEvent.title || '',
        time: this.selectedEvent.time || '',
        guests: this.selectedEvent.guests || '',
        meetingLink: this.selectedEvent.meetingLink || '',
        location: this.selectedEvent.location || '',
        date: this.selectedEvent.date || ''
      };

      // Update in allEvents
      const index = this.allEvents.findIndex(e => e === this.originalEvent);
      if (index !== -1) {
        this.allEvents[index] = updatedEvent;
      }

      // Update in calendarDays
      this.calendarDays.forEach(day => {
        const eventIndex = day.events.findIndex(e => e === this.originalEvent);
        if (eventIndex !== -1) {
          day.events[eventIndex] = updatedEvent;
        }
      });

      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.selectedEvent = null;
    this.originalEvent = null;
  }
}
