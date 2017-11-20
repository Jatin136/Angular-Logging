import { Component } from '@angular/core';

import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private loggingService: LoggingService) {  }

  TestLog() {
    this.loggingService.log('test log', 'j', 'patel');
  }

  InfoLog() {
    this.loggingService.info('test log', 'j', 'patel');
  }

  ErrorLog() {
    this.loggingService.error('test log', 'j', 'patel');
  }
}
