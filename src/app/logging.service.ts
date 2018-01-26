import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6
}

export class LogEntry {
  entryDate: Date = new Date();
  message = '';
  level: LogLevel = LogLevel.All;
  logWithDate = true;
  extraInfo: any[] = [];

  buildLogString(): string {
    let msg = '';

    if (this.logWithDate) {
      msg += 'Date - ' + this.entryDate;
      msg += ' - Type: ' + LogLevel[this.level];
      msg += ' - Message: ' + this.message;
      if (this.extraInfo.length > 0) {
        msg += ' - Extra Info ' + this.formatParams(this.extraInfo);
      }
    }
    return msg;
  }

  formatParams(...param: any[]): string {
    let msg = '';
    msg += param.join(', ');
    return msg;
  }
}

@Injectable()
export class LoggingService {
  logLevel: LogLevel = LogLevel.All;

  constructor(private http: Http) {

  }

  shouldLog(level: LogLevel): boolean {
    let ret = false;

    if (this.logLevel !== LogLevel.Off && level >= this.logLevel) {
      ret = true;
    }

    return ret;
  }

  info(msg: string) {
    return msg;
  }

  warn(msg: string, ...params: any[]) {
    return msg;
  }
  
  error(msg: string) {
    return msg;
  }

  debug(msg: string, ...params: any[]) {
    return msg;    
  }

  fatal(msg: string, ...params: any[]) {
    return msg;
  }

  log(msg: string) {
    return msg;
  }

  writeLog(msg: string, level: LogLevel, ...params: any[]): string {    
    
    if (this.shouldLog(level)) {
      
      const entry: LogEntry = new LogEntry();
      entry.level = level;
      entry.message = msg;
      entry.extraInfo = params;      

      switch (level) {
        case LogLevel.All:
          return this.log(entry.buildLogString());
        case LogLevel.Error:
          return this.error(entry.buildLogString());          
        case LogLevel.Info:
          return this.info(entry.buildLogString());
        case LogLevel.Debug:
          return this.debug(entry.buildLogString());          
        case LogLevel.Fatal:
          return this.fatal(entry.buildLogString());
        case LogLevel.Warn:
          return this.fatal(entry.buildLogString());
        default:
          break;
      }
    }    
  }

  EntryToApiLog(msg: string, level: LogLevel, ...params: any[]): void {
    const errorMsg = this.writeLog(msg, level, params);
    const url = 'http://localhost:49935/api/Log/Post';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    this.http.post(url, JSON.stringify(errorMsg), options).subscribe(data => console.log(data), 
    error => console.log(error), () => console.log('logging to database successful'));
  }

  ClearApiLog() {
    const url = 'http://localhost:49935/api/Log/Delete';
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    this.http.delete(url, options).subscribe(data => console.log(data), 
    error => console.log(error), () => console.log('Deleted'));
  }

}
