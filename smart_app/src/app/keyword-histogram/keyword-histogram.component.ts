import { Component, Input } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-keyword-histogram',
  templateUrl: './keyword-histogram.component.html',
  styleUrl: './keyword-histogram.component.css'
})
export class KeywordHistogramComponent {
    options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the width of the upper element multiplied by the value
    width: 1,
    // if height is between 0 and 1 it will be set to the height of the upper element multiplied by the value
    height: 0.7,
    overflow: false,
  };

  @Input() data: CloudData[] = [
    {text: 'Weight-7-link-color', weight: 7, link: 'https://google.com'},
    {text: 'Weight-10-link', weight: 10, link: 'https://google.com'},
    {text: 'Weight-9-link-color', weight: 9, link: 'https://google.com'},
    {text: 'Weight-2-link-color', weight: 2, link: 'https://google.com'},
    {text: 'Weight-1-link-color', weight: 1, link: 'https://google.com'},
    {text: 'Weight-8-link-color', weight: 8, link: 'https://google.com'},
    // ...
  ];

}
