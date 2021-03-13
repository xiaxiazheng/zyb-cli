import * as shell from "shelljs";
import * as readline from "readline";
import axios from "axios";
import fse from "fs-extra";
import unzip from "unzipper";
import * as globby from "globby";
import cash from "cash";
import logger from "./logger";
import { copyDir, copyFile } from "./copy";

function shellExec(cmd: string, options = { exitIfError: true }) {
  logger.waiting(`正在执行命令: `, cmd);
  if (shell.exec(cmd, options).code !== 0) {
    logger.error(`执行命令失败: `, cmd);
    if (options.exitIfError) {
      logger.error(`执行命令失败: `, cmd, ` 不会再继续向下运行`);
      shell.exit(1);
    }
  }
  logger.success(`执行命令成功: `, cmd);
}

function clearConsole(title: any) {
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

export {
  logger,
  shellExec,
  clearConsole,
  axios,
  fse,
  cash,
  unzip,
  globby,
  copyDir,
  copyFile,
};
