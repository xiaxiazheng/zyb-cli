import axios from "axios";
import fse from "fs-extra";
import unzip from "unzipper";
import * as globby from "globby";
import cash from "cash";
import logger from "./logger";
import { copyDir, copyFile } from "./copy";
declare function shellExec(cmd: string, options?: {
    exitIfError: boolean;
}): void;
declare function clearConsole(title: any): void;
export { logger, shellExec, clearConsole, axios, fse, cash, unzip, globby, copyDir, copyFile, };
