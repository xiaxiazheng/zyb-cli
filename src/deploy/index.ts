import { shellExec, logger } from "../utils/index";
import * as path from "path";
import * as shell from "shelljs";

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
  logger.base(shellExec(`yarn build`))
  logger.base(shell.cd("../myserver"));
  logger.base(shellExec(`git pull`));
  logger.base(shellExec(`rm -rf www`));
  logger.base(shellExec(`mkdir www`));
  logger.base(shellExec(`cp -rf ../reactblog/build/* www`));
  logger.base(shellExec(`git add --all`));
  logger.base(shellExec(`git commit -m "feat: 更新前端代码"`));
  logger.base(shellExec(`git push`));

  process.exit(0);
}

export default deploy;
