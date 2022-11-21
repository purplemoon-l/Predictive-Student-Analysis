import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

declare var require: any;

import { Highcharts } from 'angular-highcharts';
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
    selector: 'okr-progress-bar-circle',
    templateUrl: './progress-bar-circle.component.html'
})
export class ProgressBarCircleComponent implements OnInit {

    public chart: Chart;
    public value: number = 0;
    public chartColorLib: Object = { 'success': '#23b76d', 'warning': '#DD9E3A', 'danger': '#da4d4d' };
    public chartColor: string = this.chartColorLib['success'];
    public backgroundColor = '#EEE';
    @Input()
    set setValue(value) {

        if (value <= 20) {
            this.chartColor = this.chartColorLib['danger'];
        } else if (value < 50) {
            this.chartColor = this.chartColorLib['warning'];
        } else if (value <= 70) {
            this.chartColor = this.chartColorLib['success'];
        } else if (value <= 80) {
            this.chartColor = this.chartColorLib['warning'];
        } else if (value <= 100) {
            this.chartColor = this.chartColorLib['danger'];
        }
        this.value = +value;
    }
    @Input() size: number;
    @Input() showPercentage: boolean;
    @Input()
    set setAbandon(value) {
        if (value) {
            this.backgroundColor = '#ddd';
            this.chartColor = '#888';
        }
    }

    constructor() {
        this.showPercentage = true;
    }
    ngOnInit() {
        this.chart = new Chart({

            chart: {
                type: 'solidgauge',
                backgroundColor: null,
                height: this.size || 65,
                width: this.size || 65,
                margin: [0, 0, 0, 0],
                spacingTop: 0,
                spacingBottom: 0,
                spacingLeft: 0,
                spacingRight: 0
            },
            credits: {
                enabled: false
            },

            title: null,

            tooltip: {
                enabled: false
            },

            pane: {
                size: '100%',
                startAngle: 0,
                endAngle: 360,
                background: {
                    backgroundColor: this.backgroundColor,
                    innerRadius: '80%',
                    outerRadius: '100%',
                    borderWidth: 0
                }
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                    },
                    linecap: 'round',
                    rounded: true,
                    states: {
                        hover: {
                            enabled: false
                        }
                    }
                }
            },

            yAxis: {
                min: 0,
                max: 100,
                labels: {
                    enabled: false
                },

                lineWidth: 0,
                minorTickInterval: null,
                tickWidth: 0
            },

            series: [{
                name: 'Speed',
                data: [{
                    name: 'First car',
                    innerRadius: '80%',
                    y: this.value,
                    color: this.chartColor,
                    dataLabels: {
                        useHTML: true,
                        format: this.showPercentage ? '<div style="text-align:center; margin-top:-18px;"><span style="font-weight:400;font-size:11px;color:' + '#555' + '">{y}%</span><br/>' : ''
                    }
                }]
            }]
        });

    }
}
