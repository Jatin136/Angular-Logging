import { Component } from '@angular/core';

import { LoggingService, LogLevel } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor (private loggingService: LoggingService) {  }

  TestLog() {
    this.loggingService.writeLog('test log', LogLevel.All, 'j', 'patel');
  }

  InfoLog() {
    this.loggingService.writeLog('test log', LogLevel.Info , 'j', 'patel');
  }

  ErrorLog() {
    this.loggingService.writeLog('test log', LogLevel.Error, 'j', 'patel');
  }

  FatalLog() {
    this.loggingService.writeLog('fatal log', LogLevel.Fatal, 'j', 'patel');
  }

  WarnLog() {
    this.loggingService.writeLog('Warn log', LogLevel.Warn, 'j', 'patel');
  }

  DebugLog() {
    this.loggingService.writeLog('Debug Level', LogLevel.Debug, 'j', 'patel');
  }
}
