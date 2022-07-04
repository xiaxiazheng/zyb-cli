import { access, constants, writeFileSync, appendFileSync } from "fs";
import { resolve as pathResolve } from "path";
import * as dayjs from "dayjs";
import walkDir from "../utils/walkDir";
import * as inquirer from "inquirer";
import SplitByMonth from "./split-by-month";
import isFileExist from "../utils/isFileExist";
import listen from "../listen";

const analysis = async () => {
  const reportPath = pathResolve(process.cwd(), "report.csv");
  writeFileSync(reportPath, "", "utf-8"); // 新建文件 或 覆盖原有文件为空

  // 遍历文件夹，获取所有文件
  const { fileList } = await walkDir({
    handleFile: (obj) => {
      const { stat, name, dir: _dir, path } = obj;
      const time = dayjs(stat.birthtime).format("YYYY-MM-DD HH:mm:ss");
      appendFileSync(reportPath, `${name},${path},${time}\n`);
    },
    filterDirList: [".git", "node_modules", "build"],
  });

  console.log("fileList", fileList);

  inquirer
    .prompt([
      {
        type: "list",
        message: "请选择下一步操作",
        name: "choice", // 指定输入的变量的变量名
        choices: ["按月份分类文件", "网页查看分类结果", "退出"],
      },
    ])
    .then((answers: any) => {
      const { choice } = answers;

      if (choice === "按月份分类文件") {
        SplitByMonth(fileList, reportPath);
      } else if (choice === "网页查看分类结果") {
        listen();
      } else {
        process.exit();
      }
    });
};

export default analysis;
