import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../../Services/BackendConnection/backend.service';
import { Meeting } from './meeting.model';
import { DatePipe } from '@angular/common';
// import * as moment from 'moment';

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

// interface Event {
//   id?: number;
//   leadId?: number;
//   eventTitle: string;
//   eventTime: string;
//   eventQuests: string;
//   meetingLink: string;
//   meetingLocation: string;
//   createdBy?: number;
//   createdAt?: Date;
//   modifiedBy?: number;
//   modifiedAt?: Date;
// }

// interface CalendarDay {
//   date: number;
//   isCurrent: boolean;
//   isToday: boolean;
//   events: Event[];
// }



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
  // weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // currentMonth: number;
  // currentYear: number;
  // calendarDays: CalendarDay[];
  // allEvents: Event[] = [];
  // showModal = false;
  // selectedDay: CalendarDay | null = null;
  // currentEvent: Event | Partial<Event> = {};
  // guests: string[] = ['Alice', 'Bob', 'Charlie'];  // Example guest list
  // isEditing = false;

  // constructor(private http: BackendService, private datePipe: DatePipe) {
  //   const today = new Date();
  //   this.currentMonth = today.getMonth();
  //   this.currentYear = today.getFullYear();
  //   this.calendarDays = [];
  // }

  // ngOnInit(): void {
  //   this.generateCalendarDays();
  //   this.getEvents();
  // }

  // generateCalendarDays(): void {
  //   this.calendarDays = [];

  //   const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
  //   const lastDayOfMonth = new Date(this.currentYear, this.currentMonth + 1, 0);
  //   const firstDayIndex = firstDayOfMonth.getDay();
  //   const lastDayIndex = lastDayOfMonth.getDate();

  //   const today = new Date();

  //   for (let i = 0; i < firstDayIndex; i++) {
  //     this.calendarDays.push({ date: 0, isCurrent: false, isToday: false, events: [] });
  //   }

  //   for (let i = 1; i <= lastDayIndex; i++) {
  //     const isToday = i === today.getDate() && this.currentMonth === today.getMonth() && this.currentYear === today.getFullYear();
  //     this.calendarDays.push({ date: i, isCurrent: true, isToday, events: [] });
  //   }

  //   const remainingDays = 42 - this.calendarDays.length;
  //   for (let i = 0; i < remainingDays; i++) {
  //     this.calendarDays.push({ date: 0, isCurrent: false, isToday: false, events: [] });
  //   }
  // }

  // prevMonth(): void {
  //   if (this.currentMonth === 0) {
  //     this.currentMonth = 11;
  //     this.currentYear--;
  //   } else {
  //     this.currentMonth--;
  //   }
  //   this.generateCalendarDays();
  //   this.getEvents();
  // }

  // nextMonth(): void {
  //   if (this.currentMonth === 11) {
  //     this.currentMonth = 0;
  //     this.currentYear++;
  //   } else {
  //     this.currentMonth++;
  //   }
  //   this.generateCalendarDays();
  //   this.getEvents();
  // }

  // selectDay(day: CalendarDay): void {
  //   console.log('Attempting to select day:', day); // Log the day being selected
  //   if (day.isCurrent) {
  //     this.selectedDay = day;
  //     console.log('Day selected:', this.selectedDay); // Confirm the day selection
  //     this.showModal = true;
  //     this.isEditing = false;
  //     this.currentEvent = {};
  //   }
  // } 

  // getEvents(): void {
  //   this.http.getapi('api/Events/GetEvents').subscribe((res: { data: any[]; }) => {
  //     this.allEvents = res.data.map((a: any) => ({
  //       id: a.id,
  //       leadId: a.leadId,
  //       eventTitle: a.eventTitle,
  //       eventTime: new Date(a.eventTime).toISOString(),
  //       eventQuests: a.eventQuests,
  //       meetingLink: a.meetingLink,
  //       meetingLocation: a.meetingLocation,
  //       createdBy: a.createdBy,
  //       createdAt: new Date(a.createdAt),
  //       modifiedBy: a.modifiedBy,
  //       modifiedAt: new Date(a.modifiedAt)
  //     }));
  //     this.updateCalendarDaysWithEvents();
  //   });
  // }

  // updateCalendarDaysWithEvents(): void {
  //   this.calendarDays.forEach(day => {
  //     day.events = this.allEvents.filter(event => {
  //       const eventDate = new Date(event.eventTime);
  //       return eventDate.getDate() === day.date &&
  //         eventDate.getMonth() === this.currentMonth &&
  //         eventDate.getFullYear() === this.currentYear;
  //     });
  //   });
  // }

  // addEvent(event: Event): void {
  //   if (!this.validateISO8601(event.eventTime)) {
  //     console.error('Invalid eventTime format');
  //     return;
  //   }

  //   console.log('Adding Event:', event);
  //   this.http.postapi('api/Events/AddEvents', event).subscribe({
  //     next: (response: any) => {
  //       console.log('Event added successfully:', response);
  //       const eventDate = new Date(event.eventTime);

  //       if (eventDate.getMonth() === this.currentMonth && eventDate.getFullYear() === this.currentYear) {
  //         const day = this.calendarDays.find(d => d.date === eventDate.getDate() && d.isCurrent);
  //         if (day) {
  //           day.events.push(event);
  //         }
  //       }

  //       this.allEvents.push(event);
  //     },
  //     error: (error: any) => {
  //       console.error('Error adding event:', error);
  //     }
  //   });
  // }

  // editEvent(event: Event, eventClick: MouseEvent): void {
  //   eventClick.stopPropagation();
  //   console.log('Editing Event:', event); 
  //   this.showModal = true;
  //   this.isEditing = true;
  //   this.currentEvent = { ...event };
  // }

  // updateEvent(event: Event): void {
  //   if (event.id) {
  //     console.log('Updating Event:', event);

  //     if (!this.validateISO8601(event.eventTime)) {
  //       console.error('Invalid eventTime format');
  //       return;
  //     }

  //     this.http.putapi(`api/Events/UpdateEvent/${event.id}`, event).subscribe({
  //       next: (response: any) => {
  //         console.log('Event updated successfully:', response);
  //         this.showModal = false;
  //         this.isEditing = false;
  //         this.currentEvent = {};
  //         this.getEvents();
  //       },
  //       error: (error: any) => {
  //         console.error('Error updating event:', error);
  //       }
  //     });
  //   } else {
  //     console.error('No event ID found for updating');
  //   }
  // }

  // validateISO8601(dateString: string): boolean {
  //   const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/;
  //   return iso8601Regex.test(dateString);
  // }

  // submitEvent(): void {
  //   console.log('Selected Day at submit start:', this.selectedDay); // Log initial state
  
  //   // Check if event title and time are provided
  //   if (!this.currentEvent.eventTitle || !this.currentEvent.eventTime) {
  //     console.error('Event title and time are required');
  //     return;
  //   }
  
  //   // Infer the selected day if not available
  //   if (!this.selectedDay || !this.selectedDay.isCurrent) {
  //     console.warn('No valid date selected, inferring from eventTime');
  //     const eventDate = new Date(this.currentEvent.eventTime);
  //     this.selectedDay = {
  //       date: eventDate.getDate(),
  //       isCurrent: true,
  //       isToday: eventDate.toDateString() === new Date().toDateString(),
  //       events: []
  //     };
  //     console.log('Inferred Selected Day:', this.selectedDay);
  //   }
  
  //   try {
  //     console.log('Original Event Time:', this.currentEvent.eventTime);
  
  //     // Validate time format
  //     const timeString = this.currentEvent.eventTime as string;
  //     const timeParts = timeString.split(':');
  //     if (timeParts.length !== 2) {
  //       throw new Error('Invalid time format. Expected format is HH:MM');
  //     }
  
  //     const [hours, minutes] = timeParts;
  //     if (isNaN(parseInt(hours)) || isNaN(parseInt(minutes))) {
  //       throw new Error('Invalid time format. Hours and minutes should be numbers');
  //     }
  
  //     const seconds = '00';
  
  //     // Log the selected date details
  //     const selectedDate = new Date(this.currentYear, this.currentMonth, this.selectedDay.date);
  //     console.log('Selected Date:', selectedDate); // Log the selected date
  
  //     // Format date and time into ISO 8601 string
  //     const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
  //     const eventDateTime = `${formattedDate}T${hours}:${minutes}:${seconds}Z`;
  
  //     // Validate the ISO 8601 date string
  //     const eventTime = moment(eventDateTime, moment.ISO_8601, true);
  //     if (!eventTime.isValid()) {
  //       throw new Error('Invalid ISO 8601 date format');
  //     }
  
  //     // Create the event object
  //     const event: Event = {
  //       id: this.currentEvent.id,
  //       leadId: this.currentEvent.leadId,
  //       eventTitle: this.currentEvent.eventTitle,
  //       eventTime: eventTime.toISOString(),
  //       eventQuests: this.currentEvent.eventQuests || '',
  //       meetingLink: this.currentEvent.meetingLink || '',
  //       meetingLocation: this.currentEvent.meetingLocation || '',
  //       createdBy: this.currentEvent.createdBy,
  //       createdAt: this.currentEvent.createdAt,
  //       modifiedBy: this.currentEvent.modifiedBy,
  //       modifiedAt: this.currentEvent.modifiedAt
  //     };
  
  //     // Log the event details before submitting
  //     console.log('Event to be submitted:', event);
  
  //     // Update or add the event
  //     if (this.isEditing) {
  //       this.updateEvent(event);
  //     } else {
  //       this.addEvent(event);
  //     }
  
  //     // Reset form and state
  //     this.currentEvent = {};
  //     this.showModal = false;
  //     this.isEditing = false;
  //   } catch (error) {
  //     console.error('Error submitting event:', error);
  //   }
  // }
   
  
  
  // deleteEvent(event: Event, eventClick: MouseEvent): void {
  //   eventClick.stopPropagation();
    
  //   if (confirm(`Are you sure you want to delete the event "${event.id}"?`)) {
  //     this.http.deleteapi(`api/Events/DeleteEvents/${event.id}`).subscribe(() => {
  //       this.allEvents = this.allEvents.filter(e => e.id !== event.id);
  //       this.updateCalendarDaysWithEvents();
  //     });
  //   }
  // }
  

  // closeModal(): void {
  //   this.showModal = false;
  //   this.isEditing = false;
  //   this.currentEvent = {};
  // }
}
