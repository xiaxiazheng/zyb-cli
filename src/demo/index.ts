import * as inquirer from "inquirer";
import * as shell from "shelljs";
import { logger, shellExec } from "../utils/index";

function demo() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "this is a demo",
        name: "var1", // 指定输入的变量的变量名
        choices: [
          "demo1",
          "demo2",
        ],
      },
    ])
    .then((answers: any) => {
      const { var1 } = answers;
      logger.base(var1);
      process.exit();
    });
}

export default demo;
