"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../utils/index");
function openFile(filePath) {
    (async () => {
        index_1.logger.waiting(`即将打开文件: `, `'${filePath}'`);
        console.log('filePath', filePath);
        // await open(filePath[0]);
        index_1.shellExec(`code ${filePath[0]}`);
        index_1.logger.success(`已经打开文件: `, `'${filePath}'`);
    })();
}
exports.default = openFile;
