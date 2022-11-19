import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { GraficasService } from '../../services/graficas.service';

@Component({
  selector: 'app-dona-http',
  templateUrl: './dona-http.component.html',
  styles: [],
})
export class DonaHttpComponent implements OnInit, AfterViewInit {
  constructor(private graficaService: GraficasService) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.graficaService.obtenerData().subscribe((data) => {
      this.doughnutChartData = {
        labels: data.labels,
        datasets: [{ data: data.values }],
      };
    });
  }

  public doughnutChartLabels: string[] = [];

  public doughnutChartData!: ChartData<'doughnut'>;
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
