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
      msg += "Date " + this.entryDate;
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

  info(msg: string, ...params: any[]) {
    // tslint:disable-next-line:no-console
    console.info(this.writeLog(msg, LogLevel.Info, params));
  }

  warn(msg: string, ...params: any[]) {
    console.warn(this.writeLog(msg, LogLevel.Warn, params));
  }

  error(msg: string, ...params: any[]) {
    console.error(this.writeLog(msg, LogLevel.Error, params));
  }

  debug(msg: string, ...params: any[]) {
    // tslint:disable-next-line:no-console
    console.debug(this.writeLog(msg, LogLevel.Debug, params));
  }

  fatal(msg: string, ...params: any[]) {
    console.log(this.writeLog(msg, LogLevel.Fatal, params));
  }

  log(msg: string, ...params: any[]) {
    console.log(this.writeLog(msg, LogLevel.All, params));
  }

  // writeLog(msg: string, ...params: any[]) {
  //   this.Log(msg, LogLevel.All, params);
  // }

  writeLog(msg: string, level: LogLevel, params: any[]) {
    let errorMsg = '';
    if (this.shouldLog(level)) {
      const entry: LogEntry = new LogEntry();
      entry.level = level;
      entry.message = msg;
      entry.extraInfo = params;
      errorMsg = entry.buildLogString();
      // switch (level) {
      //   case LogLevel.All:
      //     this.log(msg, params);
      //     break;
      //   case LogLevel.Error:
      //     errorMsg = entry.buildLogString();
      //     break;
      //   default:
      //     break;
      // }
    }
    return errorMsg;
  }
}
