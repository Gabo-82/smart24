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
    overflow: true,
  };

  @Input() data: CloudData[] = [];

  searchOtherWord(event: CloudData){
    this.router.navigate([`worldmap/${event.text}`]);
  }
}
