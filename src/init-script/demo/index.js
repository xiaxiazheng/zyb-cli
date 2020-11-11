#!/usr/bin/env node
const fs = require('fs')
const inquirer = require('inquirer')

fs.readdir('./', (err, data) => {
  inquirer.prompt([
    {
      type: 'list', // 获取用户输入的字符串
      name: 'floder', // 为用户的输入设置变量名
      message: '请选择要复制的文件夹',
      default: true,
      choices: data
    }
  ]).then((answers) => {
    const { floder } = answers
    copyDir(`./${floder}`, './新文件夹', (err) => {
      err && console.log(`出错啦：${err}`)
    })
  })
})

// 递归复制目录下的文件到目标目录
function copyDir(src, dist, callback) {
  fs.access(dist, function(err){
    if(err){
      // 目录不存在时创建目录
      fs.mkdirSync(dist);
    }
    _copy(null, src, dist);
  });

  function _copy(err, src, dist) {
    if(err){
      callback(err);
    } else {
      fs.readdir(src, function(err, paths) {
        if(err){
          callback(err)
        } else {
          paths.forEach(function(path) {
            var _src = src + '/' + path;
            var _dist = dist + '/' + path;
            fs.stat(_src, function(err, stat) {
              if(err){
                callback(err);
              } else {
                // 判断是文件还是目录
                if(stat.isFile()) {
                  fs.writeFileSync(_dist, fs.readFileSync(_src));
                } else if(stat.isDirectory()) {
                  // 当是目录是，递归复制
                  copyDir(_src, _dist, callback)
                }
              }
            })
          })
        }
      })
    }
  }
}

