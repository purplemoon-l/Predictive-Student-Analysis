import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

declare var require: any;

import { Highcharts } from 'angular-highcharts';

@Component({
    selector: 'dashboard-chart',
    templateUrl: './dashboard-chart.component.html'
})
export class DashboardChartComponent implements OnInit {

    public chart: Chart;

    ngOnInit() {
        this.chart = new Chart({
            chart: {
                renderTo: 'container2',
                type: 'line',
                height: '285'
            },
            title:{
                text:''
            },
            yAxis: {
                title: {
                    text: 'Pass percentage',
                    useHTML: true
                }
            },
            xAxis: {
                title: {
                    text: 'Semester',
                    useHTML: true
                }
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            series: [{
                data: [[1, 50],[2, 80],[3, 60],[4,89],[5,70],[6,90]]
            }]
        });

    }

}

