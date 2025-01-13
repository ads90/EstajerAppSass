import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabViewModule } from 'primeng/tabview';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Table, TableModule } from 'primeng/table';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Reservation } from '../../domain/reservation';
import { ActivatedRoute, Router } from '@angular/router';
import { event, Product } from '../../domain/product';
import { ProductService } from '../../services/product.service';
import { TranslateModule } from '@ngx-translate/core';
import arLocale from '@fullcalendar/core/locales/ar'; // Import Arabic locale

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

@Component({
  selector: 'app-product-details',
  imports: [
    CommonModule,
    ButtonModule,
    SplitButtonModule,
    TabViewModule,
    FullCalendarModule,
    InputTextModule,
    TableModule,
    IconField,
    InputIcon,
    TranslateModule
],
providers:[ProductService],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})

export class ProductDetailsComponent implements OnInit{

  items !: MenuItem[];
  Location !: MenuItem[];
  calendarOptions: CalendarOptions = {};
   @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
   checked: boolean = false;
  @ViewChild('dt') dt!: Table;
    reservations: Product[]=[];
    cols!: Column[];
    reservation!: Reservation;
    productID!:string|null;
    product:Product={}
    events:event[]=[{}];

constructor(private location:Location ,private router:Router , private route:ActivatedRoute
  ,private productservice:ProductService
){}
  ngOnInit(): void {
    this.items = [
      {
          label: 'استلام الحضانة',
          command: () => {
          }
      },
      {
          label: 'إعطاء الحضانة',
          command: () => {
          }
      },
      { separator: true },
      { label: 'حذف'}
  ];
  this.Location=[
    {
      label: 'تعيين إلى العنوان',
      command: () => {
      }
  },
  ]
  this.productID=this.route.snapshot.paramMap.get('id')
  if(this.productID)
  {
    const Foundproduct=this.productservice.getproductbyid(this.productID);
    if(Foundproduct)
    {
  this.product=Foundproduct;
    if(this.product.event && this.product.event.length > 0)
    {
    this.events=this.product.event;
    this.reservations.push(this.product)
    }
    }

  }

  this.calendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    events: this.events,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    locale: arLocale, // Set Arabic locale

  };
}
goback()
{
  this.location.back();
}
showDetails(id: string){
  this.router.navigateByUrl('reservation-details/' + id);
}


eventss = [
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

}
