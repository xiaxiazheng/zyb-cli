"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../utils/index");
const path = require("path");
const shell = require("shelljs");
const inquirer = require("inquirer");
function deploy() {
    const nowPath = path.resolve("./");
    if (!/reactblog$/.test(nowPath)) {
        index_1.logger.error("此命令只能在 reactblog 根目录执行");
        process.exit(0);
    }
    index_1.logger.success("reactblog 目录检测成功");
    index_1.logger.base(`开始部署: `);
    shell.set("-e");
    // 打包代码
    inquirer
        .prompt([
        {
            type: "input",
            name: "isBuild",
            message: "是否需要打包？(Y/N)",
        },
    ])
        .then((answers) => {
        const { isBuild } = answers;
        if (isBuild === "Y" || isBuild === "y") {
            index_1.logger.base(index_1.shellExec(`yarn build`));
        }
        index_1.logger.base(shell.cd("../blogserver"));
        index_1.logger.base(index_1.shellExec(`git pull`));
        index_1.logger.base(index_1.shellExec(`rm -rf www`));
        index_1.logger.base(index_1.shellExec(`mkdir www`));
        index_1.logger.base(index_1.shellExec(`cp -rf ../reactblog/build/* www`));
        index_1.logger.base(index_1.shellExec(`git add --all`));
        index_1.logger.base(index_1.shellExec(`git commit -m "feat: 更新前端代码"`));
        index_1.logger.base(index_1.shellExec(`git push`));
        process.exit(0);
    })
        .catch((err) => {
        index_1.logger.error(err);
        process.exit(0);
    });
}
exports.default = deploy;
