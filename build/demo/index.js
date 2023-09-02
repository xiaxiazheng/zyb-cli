"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer = require("inquirer");
const index_1 = require("../utils/index");
function demo() {
    inquirer
        .prompt([
        {
            type: "list",
            message: "this is a demo",
            name: "var1",
            choices: [
                "demo1",
                "demo2",
            ],
        },
    ])
        .then((answers) => {
        const { var1 } = answers;
        index_1.logger.base(var1);
        process.exit();
    });
}
exports.default = demo;
