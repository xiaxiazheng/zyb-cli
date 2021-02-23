import { shellExec, logger } from "../utils/index";
import * as path from "path";
import * as shell from "shelljs";
import * as inquirer from "inquirer";

function deploy() {
  const nowPath = path.resolve("./");
  if (!/reactblog$/.test(nowPath)) {
    logger.error("此命令只能在 reactblog 根目录执行");
    process.exit(0);
  }
  logger.success("reactblog 目录检测成功");

  logger.base(`开始部署: `);

  shell.set("-e");

  // 打包代码
  inquirer
    .prompt([
      {
        type: "input", // 获取用户输入的字符串
        name: "isBuild", // 为用户的输入设置变量名
        message: "是否需要打包？(Y/N)",
      },
    ])
    .then((answers: any) => {
      const { isBuild } = answers;

      if (isBuild === 'Y' || isBuild === 'y') {
        logger.base(shellExec(`yarn build`));
      }

      logger.base(shell.cd("../blogserver"));
      logger.base(shellExec(`git pull`));
      logger.base(shellExec(`rm -rf www`));
      logger.base(shellExec(`mkdir www`));
      logger.base(shellExec(`cp -rf ../reactblog/build/* www`));
      logger.base(shellExec(`git add --all`));
      logger.base(shellExec(`git commit -m "feat: 更新前端代码"`));
      logger.base(shellExec(`git push`));

      process.exit(0);
    })
    .catch((err: any) => {
      logger.error(err)
      
      process.exit(0);
    });
}

export default deploy;
