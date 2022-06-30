"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const dayjs = require("dayjs");
const SplitByMonth = (fileList) => {
    //   按月份分类文件
    const map = {};
    fileList.forEach((item) => {
        const time = dayjs(item.stat.birthtime).format("YYYY-MM");
        if (typeof map[time] === "undefined") {
            map[time] = [item];
        }
        else {
            map[time].push(item);
        }
    });
    console.log("map", map);
    //   创建新文件夹，按月份分类复制图片
    const newDir = "./origin";
    fs_1.mkdirSync(`${newDir}`);
    Object.keys(map).forEach((item) => {
        fs_1.mkdirSync(`${newDir}/${item}`);
        map[item].forEach((file) => {
            fs_1.copyFileSync(file.path, `${newDir}/${item}/${file.name}`);
        });
    });
    process.exit();
};
exports.default = SplitByMonth;
