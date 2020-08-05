const log = require('../utils/index.ts')

// const open = require("open");

const shell = require("shelljs")

function openFile(filePath) {
  (async () => {
    console.log(``);
    log.waiting(`即将打开文件: `, `'${filePath}'`);
    console.log(``);
    console.log('filePath', filePath)
    // await open(filePath[0]);
    shell.exec(`code ${filePath[0]}`)
    log.success(`已经打开文件: `, `'${filePath}'`);
  })();
}

module.exports = openFile;
