import * as logSymbols from 'log-symbols'
import * as shell from 'shelljs'
import chalk from 'chalk' // 用来在控制台按颜色打印
import * as readline from 'readline'
import axios from 'axios'
import fse from 'fs-extra'
import unzip from 'unzipper'
import * as globby from 'globby'
import cash from 'cash'
// import * as cp from 'child_process'
// import inquirer from 'inquirer'
import * as fs from 'fs'

function logger(fn = chalk.white) {
  return (msg: string) => {
    console.log(fn(msg))
  }
}

function wrap(options: { color: any; bgColor: any; tagText: any; icon?: string }) {
  const { color, bgColor, tagText } = options
  return (...args: any[]) => {
    const msg = args.join('')
    console.log(chalk[bgColor].black(tagText), chalk[color](msg))
  }
}

function symbolWrap(options: { color: any; mark: any; icon: any }) {
  const { color, mark, icon } = options
  return (...args: any[]) => {
    const msg = args.join('')
    console.log((logSymbols as any)[mark], chalk[color](msg))
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

function shellExec(cmd: string, options = { exitIfError: true }) {
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

function clearConsole(title: any) {
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


// 递归复制文件夹下的文件到目标目录
function copyDir(src: fs.PathLike, dist: fs.PathLike) {
  return new Promise<void>((resolve, reject) => {
    // 判断文件夹是否存在
    fs.access(dist, function (err) {
      if (err) {
        // 文件夹不存在时创建它
        fs.mkdirSync(dist);
      }
      _copyDir(null, src, dist)
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  });

  // 遍历文件夹下的内容并复制
  function _copyDir(err: null, src: fs.PathLike, dist: fs.PathLike) {
    return new Promise<void>((resolve, reject) => {
      if (err) {
        reject(err);
      } else {
        fs.readdir(src, function (err, paths) {
          if (err) {
            reject(err);
          } else {
            const promiseList = paths.map((path) => {
              return new Promise<void>((resolve1, reject1) => {
                const _src = src + "/" + path;
                const _dist = dist + "/" + path;
                fs.stat(_src, function (err, stat) {
                  if (err) {
                    reject1(err);
                  } else {
                    // 判断是文件还是目录
                    if (stat.isFile()) {
                      // 当是文件时，复制文件
                      copyFile(_src, _dist).then(() => {
                        resolve1();
                      });
                    } else if (stat.isDirectory()) {
                      // 当是目录时，递归复制
                      // 这里要用 copyDir 而不能用 _copyDir，因为如果判断到是文件夹那就要马上创建它！！！
                      copyDir(_src, _dist).then(() => {
                        resolve1();
                      });
                    }
                  }
                });
              });
            });
            Promise.all(promiseList)
              .then(() => {
                resolve();
              })
              .catch((err) => {
                reject(err);
              });
          }
        });
      }
    });
  }
}

// 用流复制一下文件
function copyFile(_src: fs.PathLike, _dist: fs.PathLike) {
  return new Promise<void>((resolve, reject) => {
    logger.base(`正在新建文件 ${_src}`);
    const rs = fs.createReadStream(_src);
    const ws = fs.createWriteStream(_dist);
    rs.pipe(ws);
    rs.on("end", function () {
      logger.success(`新建文件 ${_dist} 成功`);
      resolve();
    });
    rs.on("error", function (err) {
      logger.success(`新建文件 ${_dist} 失败`);
      reject(err);
    });
  });
}

export {
  logger,
  shellExec,
  chalk,
  clearConsole,
  axios,
  fse,
  cash,
  unzip,
  globby,
  copyDir,
  copyFile
}