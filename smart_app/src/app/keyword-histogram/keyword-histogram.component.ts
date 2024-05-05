import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-keyword-histogram',
  templateUrl: './keyword-histogram.component.html',
  styleUrl: './keyword-histogram.component.css'
})
export class KeywordHistogramComponent {
    constructor(private router: Router){}
    
    options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the width of the upper element multiplied by the value
    width: 1,
    // if height is between 0 and 1 it will be set to the height of the upper element multiplied by the value
    height: 0.7,
    overflow: false,
  };

  @Input() data: CloudData[] = [
    {text: 'Weight-7-link-color', weight: 7},
    {text: 'Weight-10-link', weight: 10},
    {text: 'Weight-9-link-color', weight: 9},
    {text: 'Weight-2-link-color', weight: 2},
    {text: 'Weight-1-link-color', weight: 1},
    {text: 'Weight-8-link-color', weight: 8},
    // ...
  ];

  searchOtherWord(event: CloudData){
    this.router.navigate([`worldmap/${event.text}`]);
  }
}
