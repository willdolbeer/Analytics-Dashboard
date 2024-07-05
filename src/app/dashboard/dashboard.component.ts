import { Component, OnInit } from '@angular/core';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { TableModule } from 'primeng/table';

import {
  backendDataResponse,
  DataResponse,
  DatasetResponse,
  ElementGroup,
  FieldDefinitions,
  newLayoutResponse
} from '../../data/dashboard-mock-response';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass, NgFor, NgStyle, TableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  dataPoints: DataResponse = backendDataResponse.dataPoints;
  dataPointsLayout: ElementGroup[] = newLayoutResponse.layout.filter(section => section.type === 'DATA_POINT');
  dataSets: DatasetResponse[] = backendDataResponse.dataSets;
  dataSetsLayout: ElementGroup[] = newLayoutResponse.layout.filter(section => section.type === 'DATA_SET');
  fieldDefinitions: FieldDefinitions = newLayoutResponse.fieldDefinitions;
  constructor() {}

  ngOnInit() {

  }

  getFlexValue(value: number) {
    return `0 0 ${(value / 12 * 100)}%`;
  }

  getTableColumns(dataset: DatasetResponse) {

  }
}
