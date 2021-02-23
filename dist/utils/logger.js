"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk"); // 用来在控制台按颜色打印
const logSymbols = require("log-symbols"); // 为各种日志级别提供着色的符号
function logger(fn = chalk_1.default.white) {
    return (msg) => {
        console.log(fn(msg));
    };
}
function wrap(options) {
    const { color, bgColor, tagText, icon } = options;
    return (...args) => {
        const msg = args.join('');
        console.log(icon, chalk_1.default[bgColor].black(tagText), chalk_1.default[color](msg));
    };
}
function symbolWrap(options) {
    const { color, mark, icon } = options;
    return (...args) => {
        const msg = args.join('');
        console.log(icon, logSymbols[mark], chalk_1.default[color](msg));
    };
}
logger.base = wrap({
    color: 'cyan',
    bgColor: 'bgBlue',
    tagText: ' BASE ',
    icon: '👉'
});
logger.primary = wrap({
    color: 'cyanBright',
    bgColor: 'bgBlue',
    tagText: ' Primary ',
    icon: '✨'
});
logger.info = symbolWrap({
    color: 'blue',
    mark: 'info',
    icon: '🎉'
});
logger.success = symbolWrap({
    color: 'green',
    mark: 'success',
    icon: '✅'
});
logger.warn = symbolWrap({
    color: 'yellow',
    mark: 'warning',
    icon: '⚠️'
});
logger.error = symbolWrap({
    color: 'red',
    mark: 'error',
    icon: '❌'
});
logger.done = wrap({
    color: 'green',
    bgColor: 'bgGreen',
    tagText: ' DONE ',
    icon: '🚀'
});
logger.waiting = wrap({
    color: 'yellow',
    bgColor: 'bgYellow',
    tagText: ' WAITING ',
    icon: '⚙️'
});
exports.default = logger;
