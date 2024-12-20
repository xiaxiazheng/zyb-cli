import * as program from "commander";
import demo from "./demo";
import create from "./create";
import clone from "./clone";
import deploy from "./deploy";
import listen from "./listen";
import analysis from "./analysis";
import filenames from "./batch-modity-filename";
import train from './train';

program.version(require("../package.json").version);

program
  .command("demo")
  .description("一个 demo") // 添加一个描述，在 --help 中展示
  .action(demo);

program
  .command("filenames")
  .description("批量修改文件名 filenames") // 添加一个描述，在 --help 中展示
  .action(filenames);

program
  .command("train")
  .description("火车相关")
  .action(train);

program
  .command("clone")
  .description("克隆已有项目") // 添加一个描述，在 --help 中展示
  .action(clone);

program
  .command("create")
  .description("选择模板新建项目") // 添加一个描述，在 --help 中展示
  .action(create);

program
  .command("deploy")
  .description("打包前端代码并更新，发到 server 去") // 添加一个描述，在 --help 中展示
  .action(deploy);

// @ts-ignore
program.command("listen").description("监听本地端口").action(listen);
// program.command("listen").description("监听本地端口").action(listen);

program
  .command("analysis")
  .description("分析本地文件夹内容，并生成文件 report")
  .action(analysis);

// 处理参数，之后的不会执行
program.parse(process.argv);

// 捕获错误
process.on("uncaughtException", (error) => handleUncaughtException(error, {}));
process.on("unhandledRejection", (error) =>
  handleUnhandledRejection(error, {})
);

const handleUncaughtException = (_error: Error, _options: {}) => {
  process.exit();
};

const handleUnhandledRejection = (
  _error: {} | null | undefined,
  _options: {}
) => {
  process.exit();
};

export default {};
