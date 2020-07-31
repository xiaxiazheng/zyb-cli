const program = require('commander');
// const inquirer = require('inquirer');
const shell = require('shelljs');

program.version(require('../package.json').version);

/** program.command 可以定义一个命令
 * description 添加一个描述，在 --help 中展示
 * action 指定一个回调函数执行命令
 * inquirer.prompt 可以接收一组问答对象，type字段表示问答类型，name 指定答案的key
 * 可以在 answers 里通过 name 拿到用户的输入，问答的类型有很多种，这里我们使用 input，让用户输入项目名称。 */
program
  .command('init') // 定义命令
  .description('创建项目') // 添加一个描述，在 --help 中展示
  .action(
    require('../src/init')
  );

program
  .command('open [filePath...]')
  .alias('o')
  .description('打开对应的文件')
  .action((filePath, cmd) => {
    console.log(`filePath: `, filePath);
    console.log(`cmd: `, cmd);
    // const options = cleanArgs(cmd)
    // require('./core/open')(filePath, options)
  });

program
  .command('proxy')
  .description('对 npm 和 git 进行代理')
  .action(() => {
    shell.exec(`
      git config --global http.proxy http://web-proxy.tencent.com:8080
      npm config set https-proxy http://web-proxy.oa.com:8080
      npm config set registry https://registry.npm.taobao.org
    `);
    console.log(`成功对 npm 和 git 进行代理`);
  });

program
  .command('tencent')
  .description('去除 npm 和 git 代理')
  .action(() => {
    shell.exec(`
      git config --global --unset http.proxy
      npm config rm https-proxy
      npm config set registry https://registry.npm.taobao.org
    `);
    console.log(`成功去除 npm 和 git 进行代理`);
  });

// 处理参数，之后的不会执行
program.parse(process.argv);
