import { readdirSync, renameSync } from "fs";
import * as inquirer from "inquirer";
import path = require("path");
import * as shell from "shelljs";
import { logger, shellExec } from "../utils/index";

// 替换规则
const getNewFileanme = (oldFilename: string) => {
  const reg = /Ep(\d*)/g;
  const list = oldFilename.match(reg);
  const number = list?.[0].replace('Ep', '');
  return `${number}.${oldFilename}`;
}

async function batchModifyFilename() {
  const list = readdirSync('./');
  inquirer
    .prompt([
      {
        type: "list",
        message: "当前处理的路径是 " + path.resolve('./') + "，是否继续？",
        name: "var1", // 指定输入的变量的变量名
        choices: [
          "Y",
          "N",
        ],
      },
    ])
    .then((answers: any) => {
      const { var1 } = answers;
      if (var1 === 'Y') {
        list.forEach(oldFilename => {
          const newFilename = getNewFileanme(oldFilename);
          console.log(`${oldFilename} 将会替换成 => ${newFilename}`);
        })
        return inquirer
          .prompt([
            {
              type: "list",
              message: "是否替换？",
              name: "var2", // 指定输入的变量的变量名
              choices: [
                "Y",
                "N",
              ],
            },
          ])
          .then((answers: any) => {
            const { var2 } = answers;
            if (var2 === 'Y') {
              list.forEach(oldFilename => {
                const newFilename = getNewFileanme(oldFilename);
                renameSync(path.resolve('./' + oldFilename), path.resolve('./' + newFilename)); 
                console.log(`${oldFilename} => ${newFilename} 替换成功`);
              })
            }
            process.exit();
          });
      }
      // logger.base(var1);
      process.exit();
    });
}

export default batchModifyFilename;
