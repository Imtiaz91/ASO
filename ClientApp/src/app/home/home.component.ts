import { Component } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['KARACHI'], ['ISLAMABAD'], 'SKARDU','OLDING'];
  public pieChartData: SingleDataSet = [50, 30, 40, 60];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public chart: Chart;
  public pieChartColors: Color[] = [
    {
      backgroundColor: [
        '#b1c7ca',
        '#F6D186',
        '#70AF85',
        '#00c0ef',
        
      ]
    }
  ];

  
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['NEW OPEN BIDS', 'SUMMITTED BIDS', 'AWARDED BIDS', 'NOT AWARDED'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [150, 53, 44,65], label: 'BIDS STATUS' }
  ];
  public barChartColors:  Color[] = [
    {
      backgroundColor: [
        '#b1c7ca',
        '#F6D186',
        '#70AF85',
        '#D35D6E'
        
      ]
    }
]

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: ["A+(All are Eligible) ", "A (Employment)", "B (Non-Employment)", "C (University Student)", "D (Cpllege Student)", "E (School Student)"],
        datasets: [
          {
  
            data: [12, 19, 35, 20, 2, 10],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

}
