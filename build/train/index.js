"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const shell = require("shelljs");
const fetch_1 = require("../utils/fetch");
function clone() {
    //检查控制台是否可以运行`git `开头的命令
    if (!shell.which("git")) {
        //在控制台输出内容
        shell.echo("Sorry, this script requires git");
        shell.exit(1);
    }
    inquirer
        .prompt([
        {
            type: "input",
            name: "trainId",
            message: "请输入车票Id",
        },
    ])
        .then((answers) => {
        const { trainId } = answers;
        const wordSpaceId = '114522';
        (0, fetch_1.getTrainTickets)({ trainId }).then(res => {
            var _a, _b;
            console.log('res', res);
            console.log((_b = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.ticket_list) === null || _b === void 0 ? void 0 : _b[0]);
            process.exit();
        }).catch(err => {
            console.log(err);
        });
    });
}
exports.default = clone;
