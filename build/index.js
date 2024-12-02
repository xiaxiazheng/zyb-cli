"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const demo_1 = require("./demo");
const create_1 = require("./create");
const clone_1 = require("./clone");
const deploy_1 = require("./deploy");
const analysis_1 = require("./analysis");
const batch_modity_filename_1 = require("./batch-modity-filename");
program.version(require("../package.json").version);
program
    .command("demo")
    .description("一个 demo") // 添加一个描述，在 --help 中展示
    .action(demo_1.default);
program
    .command("filenames")
    .description("批量修改文件名 filenames") // 添加一个描述，在 --help 中展示
    .action(batch_modity_filename_1.default);
const train_1 = require("./train");
program.version(require("../package.json").version);
program
    .command("train")
    .description("火车相关")
    .action(train_1.default);
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
// @ts-ignore
program.command("listen").description("监听本地端口").action(listen_1.default);
// program.command("listen").description("监听本地端口").action(listen);
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
