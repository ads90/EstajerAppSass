import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, PLATFORM_ID } from '@angular/core';
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


@Component({
  selector: 'overview-app',
  templateUrl: './overview-app.component.html',
  styleUrl: './overview-app.component.scss',
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
  ],
})
export class OverviewApp {
  chartData: any;

  chartOptions: any;

  dates: Date[] | undefined = [];

  selectedTime: string = 'Monthly';

  timeOptions: string[] = ['Weekly', 'Monthly', 'Yearly'];

  menuItems: MenuItem[] | undefined;

  sampleAppsTableDatas: any;

  metersData: any;

  tableTokens = {
      header: {
          background: 'transparent'
      },
      headerCell: {
          background: 'transparent'
      },
      row: {
          background: 'transparent'
      }
  };

  platformId = inject(PLATFORM_ID);

  configService = inject(AppConfigService);

  appState = this.configService.appState();

  designerService = inject(DesignerService);

  constructor(private cd: ChangeDetectorRef) {}

  themeEffect = effect(() => {
      if (this.configService.transitionComplete()) {
          if (this.designerService.preset()) {
              this.initChart();
          }
      }
  });

  ngOnInit() {
      this.menuItems = [
          {
              label: 'Refresh',
              icon: 'pi pi-refresh'
          },
          {
              label: 'Export',
              icon: 'pi pi-upload'
          }
      ];

      this.sampleAppsTableDatas = [
        {
          id: '#1254',
          name: { text: 'Amy Yelsner', label: 'AY', color: 'blue' },
          startTime: 'May 5th, 10:00 AM',
          endTime: 'May 5th, 4:00 PM',
          process: { value: 'Waiting for check-in' },
          amount: '350 SR'
        },
        {
          id: '#2355',
          name: { text: 'Anna Fali', label: 'AF', color: '#ECFCCB' },
          startTime: 'Mar 17th, 9:00 AM',
          endTime: 'Mar 17th, 1:00 PM',
          process: { value: 'Rented' },
          amount: '50 SR'
        },
        {
          id: '#1235',
          name: { text: 'Stepen Shaw', label: 'SS', color: '#ECFCCB' },
          startTime: 'May 24th, 11:00 AM',
          endTime: 'May 24th, 3:30 PM',
          process: { value: 'Returned' },
          amount: '750 SR'
        },
        {
          id: '#2355',
          name: { text: 'Anna Fali', label: 'AF', color: '#ECFCCB' },
          startTime: 'Mar 17th, 2:00 PM',
          endTime: 'Mar 17th, 6:00 PM',
          process: { value: 'Closed' },
          amount: '85 SR'
        },
        {
          id: '#2355',
          name: { text: 'Anna Fali', label: 'AF', color: '#ECFCCB' },
          startTime: 'Mar 17th, 8:00 AM',
          endTime: 'Mar 17th, 12:00 PM',
          process: { value: 'Draft' },
          amount: '95 SR'
        },
        {
          id: '#7896',
          name: { text: 'John Doe', label: 'JD', color: 'green' },
          startTime: 'Jun 12th, 10:30 AM',
          endTime: 'Jun 12th, 3:00 PM',
          process: { value: 'Overdue' },
          amount: '400 SR'
        },
        {
          id: '#5648',
          name: { text: 'Jane Smith', label: 'JS', color: '#FFDDC1' },
          startTime: 'Feb 23rd, 9:15 AM',
          endTime: 'Feb 23rd, 12:45 PM',
          process: { value: 'Waiting for check-out' },
          amount: '650 SR'
        },
        {
          id: '#3265',
          name: { text: 'Michael Johnson', label: 'MJ', color: '#FFD700' },
          startTime: 'Apr 30th, 1:00 PM',
          endTime: 'Apr 30th, 5:00 PM',
          process: { value: 'Draft' },
          amount: '500 SR'
        },
        {
          id: '#1423',
          name: { text: 'Emily Davis', label: 'ED', color: '#FFCCCB' },
          startTime: 'Jan 15th, 8:00 AM',
          endTime: 'Jan 15th, 1:00 PM',
          process: { value: 'Closed' },
          amount: '930 SR'
        },
        {
          id: '#6854',
          name: { text: 'Robert Brown', label: 'RB', color: '#C0C0C0' },
          startTime: 'Dec 2nd, 10:00 AM',
          endTime: 'Dec 2nd, 2:00 PM',
          process: { value: 'Returned' },
          amount: '30 SR'
        }
      ];

      this.metersData = [
          { label: 'Available', color: '#F59E0B', value: 15, text: '27' },
          { label: 'Unavailable', color: '#717179', value: 5, text: '4' },
          { label: 'Checked out', color: '#22C55E', value: 25, text: '147' },
          { label: 'In mantainance', color: '#84CC16', value: 11, text: '137' },
          { label: 'Lost', color: '#14B8A6', value: 29, text: '133' },
          { label: 'Retired', color: '#EAB308', value: 29, text: '200' }
      ];

      this.initChart();
  }

  initChart() {
      if (isPlatformBrowser(this.platformId)) {
          this.chartData = this.setChartData(this.selectedTime);
          this.chartOptions = this.setChartOptions();
          this.cd.markForCheck();
      }
  }

  setChartData(timeUnit: string) {
      const datasets = this.createDatasets(timeUnit);
      const documentStyle = getComputedStyle(document.documentElement);
      const primary200 = documentStyle.getPropertyValue('--p-primary-200');
      const primary300 = documentStyle.getPropertyValue('--p-primary-300');
      const primary400 = documentStyle.getPropertyValue('--p-primary-400');
      const primary500 = documentStyle.getPropertyValue('--p-primary-500');
      const primary600 = documentStyle.getPropertyValue('--p-primary-600');
      return {
          labels: datasets.labels,
          datasets: [
              {
                  type: 'bar',
                  label: 'Rentals for Check-out',
                  backgroundColor: primary400,
                  hoverBackgroundColor: primary600,
                  data: datasets.data![0],
                  barThickness: 32
              },
              {
                  type: 'bar',
                  label: 'Rentals for Check-in',
                  backgroundColor: primary300,
                  hoverBackgroundColor: primary500,
                  data: datasets.data![1],
                  barThickness: 32
              },
              {
                  type: 'bar',
                  label: 'Rentals Request',
                  backgroundColor: primary200,
                  hoverBackgroundColor: primary400,
                  data: datasets.data![2],
                  borderRadius: {
                      topLeft: 8,
                      topRight: 8
                  },
                  borderSkipped: false,
                  barThickness: 32
              }
          ]
      };
  }

  setChartOptions() {
      const { darkTheme } = this.configService.appState();
      const documentStyle = getComputedStyle(document.documentElement);
      const surface100 = documentStyle.getPropertyValue('--p-surface-100');
      const surface900 = documentStyle.getPropertyValue('--p-surface-900');
      const surface400 = documentStyle.getPropertyValue('--p-surface-400');
      const surface500 = documentStyle.getPropertyValue('--p-surface-500');

      return {
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
              tooltip: {
                  enabled: false,
                  position: 'nearest',
                  external: function (context:any) {
                      const { chart, tooltip } = context;
                      let tooltipEl = chart.canvas.parentNode.querySelector('div.chartjs-tooltip');

                      if (!tooltipEl) {
                          tooltipEl = document.createElement('div');
                          tooltipEl.classList.add(
                              'chartjs-tooltip',
                              'dark:bg-surface-950',
                              'bg-surface-0',
                              'p-3',
                              'rounded-[8px]',
                              'overflow-hidden',
                              'opacity-100',
                              'absolute',
                              'transition-all',
                              'duration-[0.1s]',
                              'pointer-events-none',
                              'shadow-[0px_25px_20px_-5px_rgba(0,0,0,0.10),0px_10px_8px_-6px_rgba(0,0,0,0.10)]'
                          );
                          chart.canvas.parentNode.appendChild(tooltipEl);
                      }

                      if (tooltip.opacity === 0) {
                          tooltipEl.style.opacity = 0;

                          return;
                      }

                      const datasetPointsX = tooltip.dataPoints.map((dp:any) => dp.element.x);
                      const avgX = datasetPointsX.reduce((a:any, b:any) => a + b, 0) / datasetPointsX.length;
                      const avgY = tooltip.dataPoints[0].element.y;

                      if (tooltip.body) {
                          tooltipEl.innerHTML = '';
                          const tooltipBody = document.createElement('div');

                          tooltipBody.classList.add('flex', 'flex-col', 'gap-4', 'px-3', 'py-3', 'min-w-[18rem]');
                          tooltip.dataPoints.reverse().forEach((body:any, i:any) => {
                              const row = document.createElement('div');

                              row.classList.add('flex', 'items-center', 'gap-2', 'w-full');
                              const point = document.createElement('div');

                              point.classList.add('w-2.5', 'h-2.5', 'rounded-full');
                              point.style.backgroundColor = body.dataset.backgroundColor;
                              row.appendChild(point);
                              const label = document.createElement('span');

                              label.appendChild(document.createTextNode(body.dataset.label));
                              label.classList.add('text-base', 'font-medium', 'text-color', 'flex-1', 'text-left', 'capitalize');
                              row.appendChild(label);
                              const value = document.createElement('span');

                              value.appendChild(document.createTextNode(body.formattedValue));
                              value.classList.add('text-base', 'font-medium', 'text-color', 'text-right');
                              row.appendChild(value);
                              tooltipBody.appendChild(row);
                          });
                          tooltipEl.appendChild(tooltipBody);
                      }

                      const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

                      tooltipEl.style.opacity = 1;
                      tooltipEl.style.font = tooltip.options.bodyFont.string;
                      tooltipEl.style.padding = 0;
                      const chartWidth = chart.width;
                      const tooltipWidth = tooltipEl.offsetWidth;
                      const chartHeight = chart.height;
                      const tooltipHeight = tooltipEl.offsetHeight;

                      let tooltipX = positionX + avgX + 24;
                      let tooltipY = avgY;

                      if (tooltipX + tooltipWidth > chartWidth) {
                          tooltipX = positionX + avgX - tooltipWidth - 20;
                      }

                      if (tooltipY < 0) {
                          tooltipY = 0;
                      } else if (tooltipY + tooltipHeight > chartHeight) {
                          tooltipY = chartHeight - tooltipHeight;
                      }

                      tooltipEl.style.left = tooltipX + 'px';
                      tooltipEl.style.top = tooltipY + 'px';
                  }
              },
              legend: {
                  display: false
              }
          },
          scales: {
              x: {
                  stacked: true,
                  ticks: {
                      color: darkTheme ? surface500 : surface400
                  },
                  grid: {
                      display: false,
                      borderColor: 'transparent'
                  },
                  border: {
                      display: false
                  }
              },
              y: {
                  beginAtZero: true,
                  stacked: true,
                  ticks: {
                      color: darkTheme ? surface500 : surface400
                  },
                  grid: {
                      display: true,
                      color: darkTheme ? surface900 : surface100,
                      borderColor: 'transparent'
                  },
                  border: {
                      display: false
                  }
              }
          }
      };
  }

  createDatasets(val: string) {
      let data, labels;

      if (val === 'Weekly') {
          labels = ['6 May', '13 May', '20 May', '27 May', '3 June', '10 June', '17 June', '24 June', '1 July', '8 July', '15 July', '22 July'];
          data = [
              [9000, 3000, 13000, 3000, 5000, 17000, 11000, 4000, 15000, 4000, 11000, 5000],
              [1800, 7600, 11100, 6800, 3300, 5800, 3600, 7200, 4300, 8100, 6800, 3700],
              [3800, 4800, 2100, 6600, 1000, 3800, 6500, 4200, 4300, 7000, 6800, 3700]
          ];
      } else if (val === 'Monthly') {
          labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          data = [
              [4000, 10000, 15000, 4000, 16000, 8000, 12000, 14000, 17000, 5000, 12000, 6000],
              [2100, 8400, 2400, 7500, 3700, 6500, 7400, 8000, 4800, 9000, 7600, 4200],
              [4100, 5200, 2400, 7400, 2300, 4100, 7200, 8000, 4800, 9000, 7600, 4200]
          ];
      } else if (val === 'Yearly') {
          labels = ['2019', '2020', '2021', '2022', '2023', '2024'];
          data = [
              [4500, 10500, 15500, 4500, 16500, 8500, 12500, 14500, 17500, 5500, 12500, 6500],
              [2250, 8700, 2550, 7650, 3850, 6650, 7650, 8250, 4950, 9250, 7850, 4450],
              [4350, 5450, 2650, 7650, 2550, 4350, 7450, 8250, 4950, 9250, 7850, 4450]
          ];
      }

      return {
          data,
          labels
      };
  }

  changeSelect() {
      this.chartData = this.setChartData(this.selectedTime);
      this.chartOptions = this.setChartOptions();
  }

  getShipmentStatusTagColor(status: string): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | undefined {
    switch (status) {
      case 'Draft':
        return 'secondary'; // Corresponds to a neutral or inactive state
      case 'Closed':
        return 'success'; // Corresponds to '#22C55E'
      case 'Rented':
        return 'info'; // Corresponds to '#84CC16'
      case 'Overdue':
        return 'danger'; // Corresponds to '#EAB308'
      case 'Waiting for check-in':
        return 'warn'; // Corresponds to '#F59E0B'
      case 'Waiting for check-out':
        return 'warn'; // Corresponds to '#F59E0B'
      case 'Returned':
        return 'danger'; // Corresponds to '#EAB308'
      default:
        return undefined; // Default case for undefined status
    }
}

}
