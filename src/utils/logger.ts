import * as chalk from 'chalk' // 用来在控制台按颜色打印
import * as logSymbols from 'log-symbols' // 为各种日志级别提供着色的符号

function logger(fn = chalk.white) {
  return (msg: string) => {
    console.log(fn(msg))
  }
}

function wrap(options: { color: string; bgColor: string; tagText: string; icon: string }) {
  const { color, bgColor, tagText, icon } = options
  return (...args: any[]) => {
    const msg = args.join('')
    console.log(icon, chalk[bgColor].black(tagText), chalk[color](msg))
  }
}

function symbolWrap(options: { color: string; mark: string; icon: string }) {
  const { color, mark, icon } = options
  return (...args: any[]) => {
    const msg = args.join('')
    console.log(icon, (logSymbols as any)[mark], chalk[color](msg))
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

export default logger