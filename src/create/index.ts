import * as inquirer from "inquirer";
import * as shell from "shelljs";
import { logger, shellExec } from "../utils/index";

const templateObj: any = {
  "cli-template": "cli 命令行工具模板",
  "koa-template": "koa 后端接口服务模板",
  "rollup-template": "react 组件库 or npm 工具库模板",
  react: "react 前端项目模板",
};
const templateObjMap = Object.keys(templateObj).reduce(
  (prev: any, cur: string) => {
    prev[templateObj[cur]] = cur;
    return prev;
  },
  {}
);

function create() {
  //检查控制台是否可以运行`git `开头的命令
  if (!shell.which("git")) {
    //在控制台输出内容
    shell.echo("Sorry, this script requires git");
    shell.exit(1);
  }

  inquirer
    .prompt([
      {
        type: "list",
        message: "请选择你要新建的项目类型",
        name: "projectName", // 指定输入的变量的变量名
        choices: Object.values(templateObj),
      },
    ])
    .then((answers: any) => {
      const { projectName } = answers;
      if (templateObjMap[projectName] === "react") {
        console.log(
          "请跑这个命令: npx create-react-app ts-react --template=typescript"
        );
      } else {
        console.log(`正在 clone ${projectName} 项目，请稍等`);
        const remote = `https://github.com/xiaxiazheng/${projectName}.git`;
        shellExec(`git clone ${remote} --depth=1`);
        shell.cd(`${projectName}`);
        shellExec(`npm i`);
        shellExec(`code .`);

        logger.base("done");
      }
      process.exit();
    });
}

export default create;
