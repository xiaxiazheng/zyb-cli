const chalk = require('chalk')
const logSymbols = require('log-symbols')

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

    // return this
  }
}

function symbolWrap(options) {
  const { color, mark, icon } = options
  return (...args) => {
    const msg = args.join('')
    console.log(logSymbols[mark], chalk[color](msg))

    // return this
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

module.exports = logger

// export function prettyLog(obj) {
//   jsome(obj)
// }
