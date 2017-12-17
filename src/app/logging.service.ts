import { Injectable } from "@angular/core";

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
  message = "";
  level: LogLevel = LogLevel.Debug;
  logWithDate = true;
  extraInfo: any[] = [];

  buildLogString(): string {
    let msg = "";

    if (this.logWithDate) {
      msg += "Date - " + this.entryDate;
      msg += " - Type: " + LogLevel[this.level];
      msg += " - Message: " + this.message;
      if (this.extraInfo.length > 0) {
        msg += " - Extra Info " + this.formatParams(this.extraInfo);
      }
    }
    return msg;
  }

  formatParams(...param: any[]): string {
    let msg = "";
    msg += param.join(", ");
    return msg;
  }
}

@Injectable()
export class LoggingService {
  logLevel: LogLevel = LogLevel.All;

  shouldLog(level: LogLevel): boolean {
    let ret = false;

    if (this.logLevel !== LogLevel.Off && level >= this.logLevel) {
      ret = true;
    }

    return ret;
  }

  info(msg: string) {
    console.log(msg);
  }

  warn(msg: string, ...params: any[]) {
    console.log(msg);
  }
  
  error(msg: string) {
    console.log(msg);
  }

  debug(msg: string, ...params: any[]) {
    console.log(msg);    
  }

  fatal(msg: string, ...params: any[]) {
    console.log(msg);
  }

  log(msg: string) {
    console.log(msg);
  }

  writeLog(msg: string, level: LogLevel, ...params: any[]) {
    let errorMsg = '';
    if (this.shouldLog(level)) {
      const entry: LogEntry = new LogEntry();
      entry.level = level;
      entry.message = msg;
      entry.extraInfo = params;
      errorMsg = entry.buildLogString();
      switch (level) {
        case LogLevel.All:
          this.log(entry.buildLogString());
          break;
        case LogLevel.Error:
          this.error(entry.buildLogString());
          break;
        case LogLevel.Info:
          this.info(entry.buildLogString());
          break;
        case LogLevel.Debug:
          this.debug(entry.buildLogString());
          break;
        case LogLevel.Fatal:
          this.fatal(entry.buildLogString());
          break;
        case LogLevel.Warn:
          this.fatal(entry.buildLogString());
          break;
        default:
          break;
      }
    }
    return errorMsg;
  }
}
