import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DatePickerModule } from 'primeng/datepicker';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MeterGroupModule } from 'primeng/metergroup';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { AppConfigService } from '../../services/appconfigservice';
import { DesignerService } from '../../services/designerservice';
import { DrawerModule } from 'primeng/drawer';
import { KnobModule } from 'primeng/knob';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { PanelModule } from 'primeng/panel';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


@Component({
  selector: 'calendar-app',
  templateUrl: './calendar-app.component.html',
  styleUrl: './calendar-app.component.scss',
  imports: [
    CommonModule,
        RouterModule,
        ChartModule,
        SelectButtonModule,
        FormsModule,
        AvatarModule,
        TooltipModule,
        IconFieldModule,
        InputIconModule,
        ButtonModule,
        TableModule,
        MeterGroupModule,
        InputTextModule,
        MenuModule,
        TagModule,
        MeterGroupModule,
        OverlayBadgeModule,
        DatePickerModule,
        FullCalendarModule,
        PanelModule,


  ],
})
export class CalendarApp  implements OnInit {
    calendarOptions: CalendarOptions = {};
    currentDate: string ='';
    Showlist:boolean=true;
    selectedEvent: any = null;
    @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

    events = [
      {
        id: '0003',
        title: 'CHECK-OUT-0003: fff - Abdullah Tahan',
        start: '2025-01-08T21:30:00',
        end: '2025-01-09T03:15:00',
      },
      {
        id: '0007',
        title: 'RESERVATION-0007: Product one - Abdullah Tahan',
        start: '2025-01-16T00:30:00',
        end: '2025-01-23T01:30:00',
      },
    ];

    list:any=[
      {
        date:'Today 4:30 am - Jan 17 10:15 am',
        itemname:'Product once',
        personname:'mohamed',
        Status:'open',
        days:'8 days',

      },
      {
        date:'Today 4:30 am - Jan 17 10:15 am',
        itemname:'Book',
        personname:'Ahmed',
        Status:'open',
        days:'7 days',

      },
      {
        date:'Today 4:30 am - Jan 17 10:15 am',
        itemname:'Product once',
        personname:'mohamed',
        Status:'open',
        days:'8 days',

      }
    ];

    ngOnInit(): void {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        events: this.events,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        eventClick: (info) => this.onEventClick(info),
      };
      const date = new Date();
      this.currentDate = date.toDateString();
    }

    onEventClick(info: any): void {
      this.selectedEvent = {
        id: info.event.id,
        title: info.event.title,
        start: info.event.start.toISOString(),
        end: info.event.end?.toISOString(),
      };
    }

    showlist()
    {
      this.Showlist=!this.Showlist;
      setTimeout(() => {
        if (this.calendarComponent) {
          const calendarApi = this.calendarComponent.getApi();
          calendarApi.updateSize(); // Update the calendar size
        }
      }, 0);


    }
  }
