"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const inquirer = require("inquirer");
const path = require("path");
// 替换规则
const getNewFileanme = (oldFilename) => {
    const reg = /Ep(\d*)/g;
    const list = oldFilename.match(reg);
    const number = list === null || list === void 0 ? void 0 : list[0].replace('Ep', '');
    return `${number}.${oldFilename}`;
};
async function batchModifyFilename() {
    const list = (0, fs_1.readdirSync)('./');
    inquirer
        .prompt([
        {
            type: "list",
            message: "当前处理的路径是 " + path.resolve('./') + "，是否继续？",
            name: "var1",
            choices: [
                "Y",
                "N",
            ],
        },
    ])
        .then((answers) => {
        const { var1 } = answers;
        if (var1 === 'Y') {
            list.forEach(oldFilename => {
                const newFilename = getNewFileanme(oldFilename);
                console.log(`${oldFilename} 将会替换成 => ${newFilename}`);
            });
            return inquirer
                .prompt([
                {
                    type: "list",
                    message: "是否替换？",
                    name: "var2",
                    choices: [
                        "Y",
                        "N",
                    ],
                },
            ])
                .then((answers) => {
                const { var2 } = answers;
                if (var2 === 'Y') {
                    list.forEach(oldFilename => {
                        const newFilename = getNewFileanme(oldFilename);
                        (0, fs_1.renameSync)(path.resolve('./' + oldFilename), path.resolve('./' + newFilename));
                        console.log(`${oldFilename} => ${newFilename} 替换成功`);
                    });
                }
                process.exit();
            });
        }
        // logger.base(var1);
        process.exit();
    });
}
exports.default = batchModifyFilename;
