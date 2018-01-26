import { LoggingService, LogLevel, LogEntry } from "./logging.service";

export abstract class LogPublisher {
    logType: string;

    abstract clear();
    abstract log(msg: string, logLevel: LogLevel, ...params: any[]);    
}

export class LoggerClass extends LogPublisher {

    constructor(private loggingService: LoggingService) {
        super();
    }

    log(msg: string, logLevel: LogLevel, ...params: any[]) {
       console.log(this.loggingService.writeLog(msg, logLevel, params));
    }

    logType: string;

    clear() {
        console.clear();
    }
}

export class LocalStorage extends LogPublisher {

    constructor(private loggingService: LoggingService) {
        super();
    }

    clear() {
        localStorage.clear();
    }

    log(msg: string, logLevel: LogLevel, ...params: any[]) {
        let logEntry = new LogEntry();
        logEntry.message = msg;
        logEntry.extraInfo = params;
        
        if (localStorage.getItem(this.logType) == null)
            localStorage.setItem(this.logType, logEntry.buildLogString());
    }

    logType: string = "localStorage";

}

export class ApiLog extends LogPublisher {    

    constructor(private loggingService: LoggingService) {
        super();
    }
    
    clear() {
        this.loggingService.ClearApiLog();
    }
    log(msg: string, logLevel: LogLevel, ...params: any[]) {
        this.loggingService.EntryToApiLog(msg, logLevel, params);
    }
}