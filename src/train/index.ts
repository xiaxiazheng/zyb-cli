import * as inquirer from "inquirer";
import * as shell from "shelljs";
import { logger, shellExec } from "../utils/index";
import { getTrainTickets } from "../utils/fetch";

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
        type: "input", // 获取用户输入的字符串
        name: "trainId", // 为用户的输入设置变量名
        message: "请输入车票Id",
      },
    ])
    .then((answers: any) => {
      const { trainId } = answers;
      const wordSpaceId = '114522';
      getTrainTickets({ trainId }).then(res => {
        console.log('res', res);
        console.log(res?.data?.ticket_list?.[0]);

        process.exit();
      }).catch(err => {
        console.log(err);
      })
    });
}

export default clone;
