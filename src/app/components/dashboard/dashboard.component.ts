import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  Inject,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
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
import { Subscription } from 'rxjs';
import { AppConfigService } from '../../services/appconfigservice';
import { DividerModule } from 'primeng/divider';
import { OverviewApp } from '../overview-app/overview-app.component';
import { DrawerModule } from 'primeng/drawer';
import { KnobModule } from 'primeng/knob';
import { CustomersApp } from '../customers/customers.component';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { CustomTranslateService } from '../../services/custom-translate.service';
import { StorageLanguage } from '../../shared/models/enum';
import { TranslateModule } from '@ngx-translate/core';
import { ProductsApp } from '../products/products.component';
import { ShipmentsApp } from "../shipments/shipments.component";
import { CalendarApp } from '../calendar-app/calendar-app.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
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
    DividerModule,
    OverviewApp,
    DrawerModule,
    KnobModule,
    CustomersApp,
    ProductsApp,
    ToggleSwitchModule,
    TranslateModule,
    ShipmentsApp,
    CalendarApp
],
})
export class Dashboard implements OnInit, OnDestroy {

  darkMode: boolean = false;

  selectedLanguage: string = 'en';
  
  selectedSampleOption: any;

  sampleOptions: any;

  sampleAppsSidebarNavs: any;

  sampleAppsSidebarNavsMore: any;

  selectedSampleAppsSidebarNav: any;

  isSlimMenu: boolean = false;

  value1: number = 24;

  radioValue: string = 'S';

  dateValue: Date = new Date();

  switchValue: boolean = true;

  dashboardSidebarVisible: boolean = false;

  chartData: any;

  chartOptions: any;

  selectButtonValue!: SelectItem;

  selectButtonOptions!: SelectItem[];

  user: any = null;

  users: any[] = [];

  items: MenuItem[] = [];

  rangeValues = [20, 80];

  subscription: Subscription | null = null;

  churnRisk: number = 24;

  lineChartData: any = {};

  lineChartOptions: any = {};

  customerSatisfaction: number = 56;

  chartData2: any = {};

  chartOptions2: any = {};

  get isDarkMode(): boolean {
    return this.configService.appState().darkTheme ?? false;
  }

  configService = inject(AppConfigService);

  constructor(
    public translate: CustomTranslateService,
    @Inject(PLATFORM_ID) private platformId: any,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    
    this.configService.appState.update((state) => ({ ...state, darkTheme: false }));
    this.sampleOptions = [
      {
        icon: 'pi pi-home',
        title: 'Overview',
      },
      {
        icon: 'pi pi-calendar',
        title: 'Calendar',
      },
      {
        icon: 'pi pi-user',
        title: 'Customers',
      },
      {
        icon: 'pi pi-user',
        title: 'Customers',
      },
      {
        icon: 'pi pi-user',
        title: 'Customers',
      },
      {
        icon: 'pi pi-objects-column',
        title: 'Products',
      },
      {
        icon: 'pi pi-send',
        title: 'Shipments',
      },
      {
        icon: 'pi pi-calculator',
        title: 'Price Calculator',
      },
      {
        icon: 'pi pi-box',
        title: 'Box Types',
      },
      //   Only admin can see this
      {
        icon: 'pi pi-users',
        title: 'Accounts',
      },
      //   Only admin can see this
      {
        icon: 'pi pi-truck',
        title: 'Carriers',
      },
      {
        icon: 'pi pi-comment',
        title: 'Chat',
        src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/chat',
      },
      {
        icon: 'pi pi-inbox',
        title: 'Inbox',
        src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/mail',
      },
      {
        icon: 'pi pi-th-large',
        title: 'Cards',
        src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/cards',
      },
      {
        icon: 'pi pi-video',
        title: 'Movies',
        src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/sampleshots/movies',
      },
    ];
    this.selectedSampleOption = this.sampleOptions[0];

    this.sampleAppsSidebarNavs = [
      { icon: 'pi pi-home', title: 'Overview' },
      { icon: 'pi pi-calendar', title: 'Calendar' },
      { icon: 'pi pi-objects-column', title: 'Products' },
      { icon: 'pi pi-user', title: 'Customers' },
      { icon: 'pi pi-check', title: 'Check In/Out' },
      //   Only admin can see this
      { icon: 'pi pi-users', title: 'Accounts' }, 
    ];
    this.sampleAppsSidebarNavsMore = [{ icon: 'pi pi-cog', title: 'Settings' }];

    this.selectedSampleAppsSidebarNav = 'Overview';
    this.selectButtonValue = { label: 'Styled', value: 1 };

    this.selectButtonOptions = [
      { label: 'Styled', value: 1 },
      { label: 'Unstyled', value: 2 },
    ];

    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
    ];

    this.users = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
    ];

    if (isPlatformBrowser(this.platformId)) {
      this.chartData2 = this.setChartData();
      this.chartOptions2 = this.setChartOptions();
      this.lineChartData = this.setLineChartData();
      this.lineChartOptions = this.setLineChartOptions();
    }
  }

  setChartData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const borderColor = documentStyle.getPropertyValue(
      '--p-content-border-color'
    );
    const hoverBackgroundColor =
      documentStyle.getPropertyValue('--p-primary-color');

    return {
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      datasets: [
        {
          type: 'bar',
          label: 'Investment Wallet',
          backgroundColor: borderColor,
          data: [100, 201, 404, 300, 140, 220, 314, 520, 145, 234, 325, 147],
          borderRadius: {
            topLeft: 4,
            topRight: 4,
          },
          borderSkipped: true,
          barThickness: 20,
          hoverBackgroundColor: hoverBackgroundColor,
          hoverTransition: '1s ease all',
        },
      ],
    };
  }

  setChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const backgroundColor = documentStyle.getPropertyValue(
      '--p-content-background'
    );
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const borderColor = documentStyle.getPropertyValue(
      '--p-content-border-color'
    );
    const textMutedColor = documentStyle.getPropertyValue(
      '--p-text-muted-color'
    );

    const getOrCreateTooltip = (chart: any) => {
      let tooltipEl = chart.canvas.parentNode.querySelector(
        'div.chartjs-tooltip'
      );

      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.classList.add('chartjs-tooltip');
        tooltipEl.style.backgroundColor = backgroundColor;
        tooltipEl.style.boxShadow =
          ' 0px 33.12px 9.399px 0px rgba(0, 0, 0, 0.00), 0px 21.036px 8.504px 0px rgba(0, 0, 0, 0.01), 0px 12.084px 7.161px 0px rgba(0, 0, 0, 0.05), 0px 5.371px 5.371px 0px rgba(0, 0, 0, 0.09), 0px 1.343px 2.685px 0px rgba(0, 0, 0, 0.10)';
        tooltipEl.style.borderRadius = '7px';
        tooltipEl.style.color = textColor;
        tooltipEl.style.opacity = 1;
        tooltipEl.style.padding = '14.5px';
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .2s ease';
        chart.canvas.parentNode.appendChild(tooltipEl);
      }

      return tooltipEl;
    };

    return {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        chartAreaBorder: {
          borderColor: 'red',
          borderWidth: 2,
          borderDash: [5, 5],
          borderDashOffset: 2,
        },
        tooltip: {
          enabled: false,
          padding: 5,
          position: 'nearest',
          external: function (context: any) {
            // Tooltip Element
            const { chart, tooltip } = context;
            const tooltipEl = getOrCreateTooltip(chart);

            // Hide if no tooltip
            if (tooltip.opacity === 0) {
              tooltipEl.style.opacity = 0;

              return;
            }

            if (tooltip.body) {
              const bodyLines = tooltip.body.map((b: any) => {
                const strArr = b.lines[0].split(':');
                const data = {
                  text: strArr[0].trim(),
                  value: strArr[1].trim(),
                };

                return data;
              });

              // Clear old content
              tooltipEl.innerHTML = '';
              bodyLines.forEach((body: any, i: any) => {
                const text = document.createElement('div');

                text.appendChild(
                  document.createTextNode('$' + body.value + 'K')
                );
                text.style.fontWeight = '500';
                text.style.lineHeight = '21px';
                text.style.fontSize = '14px';
                tooltipEl.appendChild(text);
              });
            }

            const { offsetLeft: positionX, offsetTop: positionY } =
              chart.canvas;

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.left = positionX + tooltip.caretX + 'px';
            tooltipEl.style.top = positionY + tooltip.caretY + 'px';
            tooltipEl.style.font = tooltip.options.bodyFont.string;
            tooltipEl.style.padding =
              tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
          },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textMutedColor,
          },
          grid: {
            color: 'transparent',
            borderColor: 'transparent',
          },
        },
        y: {
          border: {
            display: false,
          },
          stacked: true,
          ticks: {
            color: textMutedColor,
          },
          grid: {
            color: borderColor,
            borderColor: 'transparent',
          },
        },
      },
    };
  }

  setLineChartData() {
    const { darkTheme } = this.configService.appState();

    return {
      labels: ['31', '1', '2', '3', '4', '5', '6', '7', '8'],
      datasets: [
        {
          label: 'My First Dataset',
          data: [60, 64, 57, 52, 58, 70, 75, 70, 60],
          fill: true,
          borderColor: '#16A34A',
          tension: 0.4,
          borderWidth: 1.5,
          pointBackgroundColor: '#16A34A',
          pointBorderColor: darkTheme ? '#09090B' : '#FFF',
          pointBorderWidth: 3,

          hideInLegendAndTooltip: false,
          pointStyle: function (context: any) {
            let index = context.dataIndex;

            if (index == 6) {
              return 'circle';
            } else {
              return 'line';
            }
          },
          pointRadius: function (context: any) {
            let index = context.dataIndex;

            if (index == 6) {
              return 6;
            } else {
              return 0.1;
            }
          },
          backgroundColor: (context: any) => {
            const bgColor = ['rgba(22,163,74,0.16)', 'rgba(22,163,74,0)'];

            if (!context.chart.chartArea) {
              return;
            }

            const {
              ctx,
              data,
              chartArea: { top, bottom },
            } = context.chart;
            const gradientBg = ctx.createLinearGradient(0, top, 0, bottom);
            const colorTranches = 1 / (bgColor.length - 1);

            for (let i = 0; i < bgColor.length; i++) {
              gradientBg.addColorStop(0 + i * colorTranches, bgColor[i]);
            }

            return gradientBg;
          },
        },
      ],
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      },
    };
  }

  setLineChartOptions() {
    const documentStyle = getComputedStyle(document.documentElement);
    const backgroundColor = documentStyle.getPropertyValue(
      '--p-content-background'
    );
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const borderColor = documentStyle.getPropertyValue(
      '--p-content-border-color'
    );
    const textMutedColor = documentStyle.getPropertyValue(
      '--p-text-muted-color'
    );

    const getOrCreateTooltip = (chart: any) => {
      let tooltipEl = chart.canvas.parentNode.querySelector(
        'div.chartjs-tooltip'
      );

      if (!tooltipEl) {
        tooltipEl = document.createElement('div');
        tooltipEl.classList.add('chartjs-tooltip');
        tooltipEl.style.backgroundColor = backgroundColor;
        tooltipEl.style.boxShadow =
          ' 0px 33.12px 9.399px 0px rgba(0, 0, 0, 0.00), 0px 21.036px 8.504px 0px rgba(0, 0, 0, 0.01), 0px 12.084px 7.161px 0px rgba(0, 0, 0, 0.05), 0px 5.371px 5.371px 0px rgba(0, 0, 0, 0.09), 0px 1.343px 2.685px 0px rgba(0, 0, 0, 0.10)';
        tooltipEl.style.borderRadius = '7px';
        tooltipEl.style.color = textColor;
        tooltipEl.style.opacity = 1;
        tooltipEl.style.padding = '2px';
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.position = 'absolute';
        tooltipEl.style.transform = 'translate(-50%, 0)';
        tooltipEl.style.transition = 'all .2s ease';
        chart.canvas.parentNode.appendChild(tooltipEl);
      }

      return tooltipEl;
    };

    return {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        chartAreaBorder: {
          borderColor: 'red',
          borderWidth: 2,
          borderDash: [5, 5],
          borderDashOffset: 2,
        },
        tooltip: {
          enabled: false,
          padding: 8,
          position: 'nearest',
          external: function (context: any) {
            // Tooltip Element
            const { chart, tooltip } = context;
            const tooltipEl = getOrCreateTooltip(chart);

            // Hide if no tooltip
            if (tooltip.opacity === 0) {
              tooltipEl.style.opacity = 0;

              return;
            }

            if (tooltip.body) {
              const bodyLines = tooltip.body.map((b: any) => {
                const strArr = b.lines[0].split(':');
                const data = {
                  text: strArr[0].trim(),
                  value: strArr[1].trim(),
                };

                return data;
              });

              // Clear old content
              tooltipEl.innerHTML = '';
              bodyLines.forEach((body: any, i: any) => {
                const text = document.createElement('div');

                text.appendChild(document.createTextNode(body.value + '.000'));
                text.style.fontWeight = '500';
                text.style.lineHeight = '21px';
                text.style.fontSize = '14px';
                tooltipEl.appendChild(text);
              });
            }

            const { offsetLeft: positionX, offsetTop: positionY } =
              chart.canvas;

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.left = positionX + tooltip.caretX + 'px';
            tooltipEl.style.top = positionY + tooltip.caretY - 40 + 'px';
            tooltipEl.style.font = tooltip.options.bodyFont.string;
            tooltipEl.style.padding =
              tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
          },
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textMutedColor,
          },
          grid: {
            color: 'transparent',
            borderColor: 'transparent',
          },
        },
        y: {
          display: false,
          grace: 14,
        },
      },
    };
  }

  setSelectedSampleAppsSidebarNav(title: any) {
    this.selectedSampleAppsSidebarNav = title;
  }

  onLanguageChange(language: string): void {
    const isArabicSelected = language === 'ar';
    this.configService.appState.update((state) => ({ ...state, RTL: isArabicSelected }));
    this.toggleRTL(isArabicSelected);
    this.changeLanguage(language);
  }

  toggleRTL(value: boolean) {
    const htmlElement = document.documentElement;

    if (value) {
        htmlElement.setAttribute('dir', 'rtl');
    } else {
        htmlElement.removeAttribute('dir');
    }
}

toggleDarkMode() {
  this.configService.appState.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
}
changeLanguage(language: string) {
  this.translate.setLanguage(language  === 'en' ? StorageLanguage.English : StorageLanguage.Arabic);
}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
