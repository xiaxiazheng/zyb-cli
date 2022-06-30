"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const create_1 = require("./create");
const clone_1 = require("./clone");
const deploy_1 = require("./deploy");
const listen_1 = require("./listen");
const analysis_1 = require("./analysis");
program.version(require("../package.json").version);
program
    .command("clone")
    .description("克隆已有项目") // 添加一个描述，在 --help 中展示
    .action(clone_1.default);
program
    .command("create")
    .description("选择模板新建项目") // 添加一个描述，在 --help 中展示
    .action(create_1.default);
program
    .command("deploy")
    .description("打包前端代码并更新，发到 server 去") // 添加一个描述，在 --help 中展示
    .action(deploy_1.default);
program.command("listen").description("监听本地端口").action(listen_1.default);
program
    .command("analysis")
    .description("分析本地文件夹内容，并生成文件 report")
    .action(analysis_1.default);
// 处理参数，之后的不会执行
program.parse(process.argv);
// 捕获错误
process.on("uncaughtException", (error) => handleUncaughtException(error, {}));
process.on("unhandledRejection", (error) => handleUnhandledRejection(error, {}));
const handleUncaughtException = (_error, _options) => {
    process.exit();
};
const handleUnhandledRejection = (_error, _options) => {
    process.exit();
};
exports.default = {};
