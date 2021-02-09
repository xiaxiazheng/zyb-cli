// const program = require("commander");
import inquirer from "inquirer";
import shell from "shelljs";
import { shellExec } from "../utils/index";

function clone() {
  //检查控制台是否以运行`git `开头的命令
  if (!shell.which("git")) {
    //在控制台输出内容
    shell.echo("Sorry, this script requires git");
    shell.exit(1);
  }

  inquirer
    .prompt([
      {
        type: "list",
        message: "请选择你要 clone 到本地的项目",
        name: "projectName", // 指定输入的变量的变量名
        choices: [
          "reactblog",
          "myserver",
          "static-server",
          "maoweapp",
          "zyb-cli",
        ],
      },
    ])
    .then((answers: any) => {
      const { projectName } = answers;
      console.log(`正在 clone ${projectName} 项目，请稍等`);
      const remote = `https://github.com/xiaxiazheng/${projectName}.git`;
      shellExec(`git clone ${remote} --depth=1`);
      shell.cd(`${projectName}`);
      shellExec(`yarn`);
      shellExec(`code .`);

      console.log("done");
    });
}

export default clone;