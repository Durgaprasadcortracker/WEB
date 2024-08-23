import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { Meeting } from './meeting.model';

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
  showModal = false;
  selectedDay: CalendarDay | null = null;
  currentEvent: Event | Partial<Event> = {};
  guests: string[] = ['Alice', 'Bob', 'Charlie'];  // Example guest list
  isEditing = false;
  meetingDetails: Meeting | undefined;


  constructor(private http: BackendService,
  ) {
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
      this.selectedDay = day;
      this.showModal = true;
      this.isEditing = false;
      this.currentEvent = {};
    }
  }

  getEvents(): void {
    const staticEvents: Event[] = [];
    this.http.getapi('api/Lead/GetEvents').subscribe((res) => {
      console.log(res.data);
      for(let a of res.data){
        staticEvents.push(
          this.meetingDetails = new Meeting(
            a.eventTitle,
            '5:00 PM', // a.eventTime
            a.eventQuests,
            a.meetingLink,
            a.meetingLocation,
            '12 July 2024'
          )
        )
      }
      console.log(staticEvents)
      this.allEvents = staticEvents;
      this.calendarDays.forEach(day => {
        day.events = this.allEvents.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate.getDate() === day.date &&
                 eventDate.getMonth() === this.currentMonth &&
                 eventDate.getFullYear() === this.currentYear;
        });
      });
    });
  }

  addEvent(event: Event): void {
    const eventDate = new Date(event.date);
    if (eventDate.getMonth() === this.currentMonth && eventDate.getFullYear() === this.currentYear) {
      const day = this.calendarDays.find(d => d.date === eventDate.getDate() && d.isCurrent);
      if (day) {
        day.events.push(event);
      }
    }
    this.allEvents.push(event);
  }

  editEvent(event: Event, eventClick: MouseEvent): void {
    eventClick.stopPropagation(); // Prevent triggering other click handlers

    this.showModal = true;
    this.isEditing = true;
    this.currentEvent = { ...event };
  }

  deleteEvent(event: Event, eventClick: MouseEvent): void {
    eventClick.stopPropagation(); // Prevent triggering other click handlers

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

  closeModal(): void {
    this.showModal = false;
    this.currentEvent = {};
  }

  submitEvent(): void {
    if (this.currentEvent.title && this.currentEvent.time) {
      const eventDate = this.selectedDay ? `${this.selectedDay.date} ${this.months[this.currentMonth]} ${this.currentYear}` : this.currentEvent.date || '';
      const event: Event = {
        title: this.currentEvent.title,
        time: this.currentEvent.time,
        guests: this.currentEvent.guests || '',
        meetingLink: this.currentEvent.meetingLink || '',
        location: this.currentEvent.location || '',
        date: eventDate
      };

      if (this.isEditing) {
        // Find and update the event in allEvents
        const index = this.allEvents.findIndex(e => e.date === this.currentEvent.date && e.title === this.currentEvent.title && e.time === this.currentEvent.time);
        if (index !== -1) {
          this.allEvents[index] = event;
        }
        // Update the event in the calendar day
        this.calendarDays.forEach(day => {
          if (day.date === this.selectedDay?.date && day.isCurrent) {
            const eventIndex = day.events.findIndex(e => e.title === this.currentEvent.title && e.time === this.currentEvent.time);
            if (eventIndex !== -1) {
              day.events[eventIndex] = event;
            }
          }
        });
      } else {
        this.addEvent(event);
      }

      this.currentEvent = {};
      this.showModal = false;
      this.isEditing = false;
    }
  }
}
