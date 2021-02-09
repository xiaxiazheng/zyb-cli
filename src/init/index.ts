import { shellExec, logger, copyDir } from "../utils/index";
import * as inquirer from "inquirer";
import * as fs from "fs";
import * as shell from "shelljs";
// import util from "util";
import * as path from "path";

// 在运行该命令的当前目录初始化一个脚本模板
const initScript = () => {
  inquirer
    .prompt([
      {
        type: "input", // 获取用户输入的字符串
        name: "folder", // 为用户的输入设置变量名
        message: "请输入脚本名称",
      },
    ])
    .then(async (answers: any) => {
      const { folder } = answers;

      /** 创建文件夹 */
      logger.base(`正在新建脚本文件夹 ${folder}`);
      fs.mkdir(`${folder}`, (err) => {
        if (err) logger.error(err);
      });
      logger.success(`新建脚本文件夹 ${folder} 成功`);

      /** 复制脚本模板 */
      logger.base(`正在复制脚本模板`);
      await copyDir(
        path.resolve(__dirname, `../../assets/template`),
        `./${folder}`
      );
      // 修改项目名称
      const data = fs.readFileSync(`./${folder}/package.json`, "utf-8");
      fs.writeFileSync(
        `./${folder}/package.json`,
        data.replace("zyb-script", `${folder}`),
        "utf-8"
      );
      logger.success(`复制脚本模板成功`);

      /** 进入文件夹安装依赖 */
      shell.set("-e"); // 这个 -e 必不可少啊
      shell.cd(`${folder}`);
      logger.base("正在安装脚本依赖");
      logger.base(shellExec(`npm i`));
      logger.success(`脚本依赖安装成功`);

      /** 用 vscode 打开项目 */
      logger.base("正在使用 vscode 打开项目");
      shellExec(`code .`);
      logger.success(`项目打开成功`);

      process.exit();
    })
    .catch((err: any) => logger.error(err));
};

export default initScript;
