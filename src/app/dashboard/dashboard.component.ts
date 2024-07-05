import { Component } from '@angular/core';
import {
  CurrencyPipe,
  DecimalPipe,
  NgClass,
  NgFor,
  NgStyle,
  PercentPipe
} from '@angular/common';
import { TableModule } from 'primeng/table';

import {
  backendDataResponse,
  DataResponse,
  DatasetResponse,
  ElementGroup,
  FieldDefinition,
  FieldDefinitions,
  newLayoutResponse
} from '../../data/dashboard-mock-response';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgClass, NgFor, NgStyle, TableModule],
  providers: [CurrencyPipe, DecimalPipe, PercentPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  dataPoints: DataResponse = backendDataResponse.dataPoints;
  dataPointsLayout: ElementGroup[] = newLayoutResponse.layout.filter(
    (section) => section.type === 'DATA_POINT'
  );
  dataSets: DatasetResponse[] = backendDataResponse.dataSets;
  dataSetsLayout: ElementGroup[] = newLayoutResponse.layout.filter(
    (section) => section.type === 'DATA_SET'
  );
  fieldDefinitions: FieldDefinitions = newLayoutResponse.fieldDefinitions;
  constructor(
    private currencyPipe: CurrencyPipe,
    private decimalPipe: DecimalPipe,
    private percentPipe: PercentPipe
  ) {}

  getFlexValue(value: number) {
    return `0 0 ${(value / 12 * 100)}%`;
  }

  getFormattedValue(value: number | string, fieldDefinition: FieldDefinition) {
    switch (fieldDefinition.format) {
      case 'currency':
        return this.currencyPipe.transform(
          value,
          'USD',
          '$',
          fieldDefinition.digitsInfo
        );
      case 'number':
        return this.decimalPipe.transform(value, fieldDefinition.digitsInfo);
      case 'percent':
        return this.percentPipe.transform(value, fieldDefinition.digitsInfo);
      default:
        return value;
    }
  }

  getSumOfRows(field: string, dataSetIndex: number) {
    return this.dataSets[dataSetIndex].data.reduce(
      (acc, value) => acc + +value[field],
      0
    );
  }

  getAvgOfRows(field: string, dataSetIndex: number) {
    return (
      this.getSumOfRows(field, dataSetIndex) /
      this.dataSets[dataSetIndex].data.length
    );
  }

  getAggregateValue(field: string, dataSetIndex: number) {
    const fieldDefinition = this.fieldDefinitions[field];
    switch (fieldDefinition.aggFn) {
      case 'average':
        return this.getFormattedValue(
          this.getAvgOfRows(field, dataSetIndex),
          fieldDefinition
        );
      case 'sum':
        return this.getFormattedValue(
          this.getSumOfRows(field, dataSetIndex),
          fieldDefinition
        );
      default:
        return fieldDefinition.type === 'double' ? '-' : '';

    }
  }
}
