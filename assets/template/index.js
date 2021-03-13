#!/usr/bin/env node
const fs = require('fs')
const inquirer = require('inquirer')
const { copyDir } = require('./utils')
const logger = require('./utils/logger')

// fs.readdir('./', (err, data) => {
//   inquirer.prompt([
//     {
//       type: 'list', // 获取用户输入的字符串
//       name: 'floder', // 为用户的输入设置变量名
//       message: '请选择要复制的文件夹',
//       default: true,
//       choices: data
//     }
//   ]).then((answers) => {
//     const { floder } = answers
//     copyDir(`./${floder}`, './新文件夹', (err) => {
//       err && console.log(`出错啦：${err}`)
//     })
//   })
// })

logger.base('base')
logger.primary('primary')
logger.info('info')
logger.success('success')
logger.warn('warn')
logger.error('error')
logger.done('done')
logger.waiting('waiting')

