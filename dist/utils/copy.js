"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFile = exports.copyDir = void 0;
const fs = require("fs");
const logger_1 = require("./logger");
// 递归复制文件夹下的文件到目标目录
function copyDir(src, dist) {
    return new Promise((resolve, reject) => {
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
    function _copyDir(err, src, dist) {
        return new Promise((resolve, reject) => {
            if (err) {
                reject(err);
            }
            else {
                fs.readdir(src, function (err, paths) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        const promiseList = paths.map((path) => {
                            return new Promise((resolve1, reject1) => {
                                const _src = src + "/" + path;
                                const _dist = dist + "/" + path;
                                fs.stat(_src, function (err, stat) {
                                    if (err) {
                                        reject1(err);
                                    }
                                    else {
                                        // 判断是文件还是目录
                                        if (stat.isFile()) {
                                            // 当是文件时，复制文件
                                            copyFile(_src, _dist).then(() => {
                                                resolve1();
                                            });
                                        }
                                        else if (stat.isDirectory()) {
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
exports.copyDir = copyDir;
// 用流复制一下文件
function copyFile(_src, _dist) {
    return new Promise((resolve, reject) => {
        logger_1.default.base(`正在新建文件 ${_src}`);
        const rs = fs.createReadStream(_src);
        const ws = fs.createWriteStream(_dist);
        rs.pipe(ws);
        rs.on("end", function () {
            logger_1.default.success(`新建文件 ${_dist} 成功`);
            resolve();
        });
        rs.on("error", function (err) {
            logger_1.default.success(`新建文件 ${_dist} 失败`);
            reject(err);
        });
    });
}
exports.copyFile = copyFile;
