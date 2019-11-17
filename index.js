#!/usr/bin/env node
const program = require('commander');
const inquirer = require('inquirer');
const shell = require('shelljs');

const init = () => {
  inquirer.prompt([{
    type: 'input',
    message: '请输入项目名称',
    name: 'projectname'  // 指定输入的变量的变量名
  }]).then(answers => {
    console.log('项目名为：', answers.projectname);
    console.log('正在 clone 项目，请稍等');
    const remote = 'https://github.com/xiaxiazheng/reactblog.git';
    const curName = 'reactblog';
    const tarName = answers.projectname;
    shell.exec(`
      git clone ${remote} --depth=1
      mv ${curName} ${tarName}
      rm -rf ./${tarName}/.git
      cd ${tarName}
      npm i
    `, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return
      }
      console.log(`${stdout}`);
      console.log(`${stderr}`);
    });
    console.log('done');
  })
}

program.version(require('./package.json').version);

program
  .command('init')  // 定义命令
  .description('创建项目')  // 添加一个描述，在 --help 中展示
  .action(init);

program.parse(process.argv); 