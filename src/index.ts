import * as program from "commander";
// const inquirer = require('inquirer');
// const shell = require("shelljs");

program.version(require("../package.json").version);

program
  .command("init")
  .description("初始化脚本模板") // 添加一个描述，在 --help 中展示
  .action(require("./init"));

program
  .command("clone")
  .description("克隆项目") // 添加一个描述，在 --help 中展示
  .action(require("./clone"));

program
  .command("deploy")
  .description("打包前端代码并更新，发到 server 去") // 添加一个描述，在 --help 中展示
  .action(require("./deploy"));

program
  .command("open [filePath...]")
  .alias("o")
  .description("打开对应的文件")
  .action((filePath: any, _cmd: any) => {
    require("./open")(filePath);
  });

// program
//   .command('proxy')
//   .description('对 npm 和 git 进行代理')
//   .action(() => {
//     shell.exec(`
//       git config --global http.proxy http://web-proxy.tencent.com:8080
//       npm config set https-proxy http://web-proxy.oa.com:8080
//       npm config set registry https://registry.npm.taobao.org
//     `);
//     console.log(`成功对 npm 和 git 进行代理`);
//   });

// program
//   .command('tencent')
//   .description('去除 npm 和 git 代理')
//   .action(() => {
//     shell.exec(`
//       git config --global --unset http.proxy
//       npm config rm https-proxy
//       npm config set registry https://registry.npm.taobao.org
//     `);
//     console.log(`成功去除 npm 和 git 进行代理`);
//   });

// 处理参数，之后的不会执行
program.parse(process.argv);

// export default program
