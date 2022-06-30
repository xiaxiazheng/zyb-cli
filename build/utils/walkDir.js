"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 递归遍历文件夹下所有的内容
 * params: 要遍历的文件夹，不写默认当前脚本执行文件夹
 */
const fs_1 = require("fs");
const path_1 = require("path");
const walkDir = async (params) => {
    const { dir = process.cwd(), filterFileList = [], filterDirList = [], handleFile, handleDir, } = params;
    const curFolderList = [dir];
    const folderList = [];
    const fileList = [];
    const walk = (dir) => {
        return new Promise((resolve, _reject) => {
            fs_1.readdir(dir, (_err, file) => {
                file.forEach((name) => {
                    const filePath = path_1.resolve(dir, name);
                    const stat = fs_1.statSync(filePath);
                    // 处理文件
                    if (stat.isFile() && !filterFileList.includes(name)) {
                        fileList.push(filePath);
                        handleFile && handleFile(stat, name, dir, filePath);
                    }
                    if (stat.isDirectory() && !filterDirList.includes(name)) {
                        folderList.push(filePath);
                        handleDir && handleDir(stat, name, dir, filePath);
                    }
                });
                resolve();
            });
        });
    };
    while ((curFolderList === null || curFolderList === void 0 ? void 0 : curFolderList.length) !== 0) {
        const folder = curFolderList.shift();
        if (folder) {
            await walk(folder);
        }
        else {
            break;
        }
    }
    return {
        fileList,
        folderList,
    };
};
exports.default = walkDir;
