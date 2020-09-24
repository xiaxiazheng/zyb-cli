const { shellExec, logger } = require("../utils/index.ts");
const path = require("path");
const shell = require("shelljs");

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
  console.log(shellExec(`yarn build`))
  console.log(shell.cd("../myserver"));
  console.log(shellExec(`git pull`));
  console.log(shellExec(`rm -rf www`));
  console.log(shellExec(`mkdir www`));
  console.log(shellExec(`cp -rf ../reactblog/build/* www`));
  console.log(shellExec(`git add --all`));
  console.log(shellExec(`git commit -m "feat: 更新前端代码"`));
  console.log(shellExec(`git push`));

  process.exit(0);
}

module.exports = deploy;
