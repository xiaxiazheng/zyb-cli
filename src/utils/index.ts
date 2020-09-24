const logSymbols = require('log-symbols')
const shell = require('shelljs')
const chalk = require('chalk') // 用来在控制台按颜色打印
const readline = require('readline')
const axios = require('axios')
const fse = require('fs-extra')
const unzip = require('unzipper')
const globby = require('globby')
const cash = require('cash')
const cp = require('child_process')

function logger(fn = chalk.white) {
  return (msg) => {
    console.log(fn(msg))
  }
}

function wrap(options) {
  const { color, bgColor, tagText } = options
  return (...args) => {
    const msg = args.join('')
    console.log(chalk[bgColor].black(tagText), chalk[color](msg))
  }
}

function symbolWrap(options) {
  const { color, mark, icon } = options
  return (...args) => {
    const msg = args.join('')
    console.log(logSymbols[mark], chalk[color](msg))
  }
}

logger.base = wrap({
  color: 'cyan',
  bgColor: 'bgBlue',
  tagText: ' BASE ',
  icon: '👉'
})
logger.primary = wrap({
  color: 'cyanBright',
  bgColor: 'bgBlue',
  tagText: ' Primary ',
  icon: '✨'
})
logger.info = symbolWrap({
  color: 'blue',
  mark: 'info',
  icon: '🎉'
})
logger.success = symbolWrap({
  color: 'green',
  mark: 'success',
  icon: '✅'
})
logger.warn = symbolWrap({
  color: 'yellow',
  mark: 'warning',
  icon: '⚠️'
})
logger.error = symbolWrap({
  color: 'red',
  mark: 'error',
  icon: '❌'
})
logger.done = wrap({
  color: 'green',
  bgColor: 'bgGreen',
  tagText: ' DONE ',
  icon: '🚀'
})
logger.waiting = wrap({
  color: 'yellow',
  bgColor: 'bgYellow',
  tagText: ' WAITING ',
  icon: '⚙️'
})

function shellExec(cmd, options = { exitIfError: true }) {
  logger.waiting(`正在执行命令: `, cmd)
  if (shell.exec(cmd, options).code !== 0) {
    logger.error(`执行命令失败: `, cmd)
    if (options.exitIfError) {
      logger.error(`执行命令失败: `, cmd, ` 不会再继续向下运行`)
      shell.exit(1)
    }
  }
  logger.success(`执行命令成功: `, cmd)
}

function clearConsole(title) {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows)
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
    if (title) {
      console.log(title)
    }
  }
}

module.exports = {
  logger,
  shellExec,
  chalk,
  clearConsole,
  axios,
  fse,
  cash,
  unzip,
  globby
}