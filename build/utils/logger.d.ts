declare function logger(fn?: any): (msg: string) => void;
declare namespace logger {
    var base: (...args: any[]) => void;
    var primary: (...args: any[]) => void;
    var info: (...args: any[]) => void;
    var success: (...args: any[]) => void;
    var warn: (...args: any[]) => void;
    var error: (...args: any[]) => void;
    var done: (...args: any[]) => void;
    var waiting: (...args: any[]) => void;
}
export default logger;
