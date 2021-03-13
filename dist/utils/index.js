"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFile = exports.copyDir = exports.globby = exports.unzip = exports.cash = exports.fse = exports.axios = exports.clearConsole = exports.shellExec = exports.logger = void 0;
const shell = require("shelljs");
const readline = require("readline");
const axios_1 = require("axios");
exports.axios = axios_1.default;
const fs_extra_1 = require("fs-extra");
exports.fse = fs_extra_1.default;
const unzipper_1 = require("unzipper");
exports.unzip = unzipper_1.default;
const globby = require("globby");
exports.globby = globby;
const cash_1 = require("cash");
exports.cash = cash_1.default;
const logger_1 = require("./logger");
exports.logger = logger_1.default;
const copy_1 = require("./copy");
Object.defineProperty(exports, "copyDir", { enumerable: true, get: function () { return copy_1.copyDir; } });
Object.defineProperty(exports, "copyFile", { enumerable: true, get: function () { return copy_1.copyFile; } });
function shellExec(cmd, options = { exitIfError: true }) {
    logger_1.default.waiting(`正在执行命令: `, cmd);
    if (shell.exec(cmd, options).code !== 0) {
        logger_1.default.error(`执行命令失败: `, cmd);
        if (options.exitIfError) {
            logger_1.default.error(`执行命令失败: `, cmd, ` 不会再继续向下运行`);
            shell.exit(1);
        }
    }
    logger_1.default.success(`执行命令成功: `, cmd);
}
exports.shellExec = shellExec;
function clearConsole(title) {
    if (process.stdout.isTTY) {
        const blank = "\n".repeat(process.stdout.rows);
        console.log(blank);
        readline.cursorTo(process.stdout, 0, 0);
        readline.clearScreenDown(process.stdout);
        if (title) {
            console.log(title);
        }
    }
}
exports.clearConsole = clearConsole;
