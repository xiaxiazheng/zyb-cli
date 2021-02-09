#!/usr/bin/env node
'use strict'

// 导入 zyb 命令
const zyb = require('../dist')

process.on('uncaughtException', error => handleUncaughtException(error, {}));
process.on('unhandledRejection', error => handleUnhandledRejection(error, {}));

const handleUncaughtException = (error, options) => {
  process.exit()
}

const handleUnhandledRejection = (error, options) => {
  process.exit()
}

module.exports = zyb