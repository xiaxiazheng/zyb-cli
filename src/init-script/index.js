const { shellExec, logger } = require("../utils/index.ts");
const fs = require('fs')
const shell = require("shelljs")
const util = require('util')
const mkdir = util.promisify(fs.mkdir)


const initScript = () => {
  // 创建文件夹
  logger.base('新建文件夹 test-script')
  mkdir('test-script').then(() => {
    logger.success('新建文件夹 test-script 成功')
    // 拷贝默认文件
    logger.base('拷贝文件 index.js')
    copyFile('index.js').then(() => {
      logger.success('拷贝文件 index.js 成功')
      logger.base('拷贝文件 package.json')
      copyFile('package.json').then(() => {
        logger.success('拷贝文件 package.json 成功')

        // 这个 -e 必不可少啊
        shell.set("-e");
        shell.cd("./test-script")

        logger.base('项目依赖安装 ing')
        logger.base(shellExec(`cnpm i`))
        logger.base('正在打开项目')
        shellExec(`code .`)
  
        process.exit(0);
      }).catch((err) => {
        logger.error(`拷贝文件 package.json 失败：${err}`)
      })
    }).catch((err) => {
      logger.error(`拷贝文件 index.js 失败：${err}`)
    })
  }).catch((err) => {
    logger.error(`新建文件夹 test-script 失败：${err}`)
  })
  // 复制基础 demo 文件
}

// 用流复制一下文件
function copyFile(file) {
  return new Promise((resolve, reject) => {
    const rs = fs.createReadStream(__dirname + '/demo/' + file)
    const ws = fs.createWriteStream('./test-script/' + file)
    rs.pipe(ws)
    rs.on('end', function () {
      resolve(true)
    })
    rs.on('error', function (err) {
      reject(err)
    })
  })
}

module.exports = initScript;
