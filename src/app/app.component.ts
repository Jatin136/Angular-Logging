import { Component } from '@angular/core';

import { LoggingService, LogLevel } from './logging.service';
import { LoggerClass, LogPublisher, LocalStorage, ApiLog } from './logPublisher';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  loggerClass: LoggerClass;
  localStorage: LocalStorage;
  apiLog: ApiLog;

  constructor (private loggingService: LoggingService) { 
    this.loggerClass = new LoggerClass(this.loggingService);
    this.localStorage = new LocalStorage(this.loggingService);
    this.apiLog = new ApiLog(this.loggingService);
  }
  
  DeleteLocalStorageLog() {
    this.localStorage.clear();
  }

  LocalStorageLog() {    
    this.localStorage.log('Local Storage', LogLevel.Error, 'jatin', 'patel');
  }

  ClearLog() {    
    this.loggerClass.clear();
  }

  TestLog() {
    this.loggerClass.log('test log', LogLevel.All, 'j', 'patel');    
  }

  InfoLog() {
    this.loggerClass.log('test log', LogLevel.Info, 'j', 'patel');
  }

  ErrorLog() {
    this.loggerClass.log('test log', LogLevel.Error, 'j', 'patel');
  }

  FatalLog() {
    this.loggerClass.log('test log', LogLevel.Fatal, 'j', 'patel');
  }

  WarnLog() {
    this.loggerClass.log('test log', LogLevel.Warn, 'j', 'patel');
  }

  DebugLog() {
    this.loggerClass.log('test log', LogLevel.Debug, 'j', 'patel');
  }

  ApiLogEntry() {
    this.apiLog.log('api log', LogLevel.Error, 'j', 'patel');
  }

  ClearApiLogs() {
    this.apiLog.clear();
  }
}
