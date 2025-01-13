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
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import arLocale from '@fullcalendar/core/locales/ar'; // Import Arabic locale
import enLocale from '@fullcalendar/core/locales/en-gb';


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
        TranslateModule


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
        title: 'تسجيل المغادرة-0003: ;كرسي متحرك - أحمد العلي',
        start: '2025-01-08T21:30:00',
        end: '2025-01-09T03:15:00',
    },
    {
        id: '0007',
        title: 'حجز-0007: المنتج الأول - ياسر',
        start: '2025-01-16T00:30:00',
        end: '2025-01-23T01:30:00',
    },

    ];
constructor(private trans:TranslateService){}
    list:any=[
      {
        date: 'اليوم 4:30 صباحًا - 17 يناير 10:15 صباحًا',
        itemname: 'منتج واحد',
        personname: 'محمد',
        Status: 'مفتوح',
        days: '8 أيام'
      },
      {
        date: 'اليوم 4:30 صباحًا - 17 يناير 10:15 صباحًا',
        itemname: 'كتاب',
        personname: 'أحمد',
        Status: 'مفتوح',
        days: '7 أيام'
      },
      {
        date: 'اليوم 4:30 صباحًا - 17 يناير 10:15 صباحًا',
        itemname: 'منتج واحد',
        personname: 'محمد',
        Status: 'مفتوح',
        days: '8 أيام'
      }

    ];

    ngOnInit(): void {
      const currentLang = this.trans.currentLang || 'en'; // Default to 'en'

      this.calendarOptions = {

        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        events: this.events,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        locale: currentLang === 'ar' ? arLocale : enLocale, // Dynamically set locale
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
