import { mkdirSync, copyFileSync } from "fs";
import * as dayjs from "dayjs";
import { FileType } from "../utils/walkDir";

const SplitByMonth = (fileList: FileType[]) => {
  //   按月份分类文件
  const map: {
    [key in string]: FileType[];
  } = {};
  fileList.forEach((item) => {
    const time = dayjs(item.stat.birthtime).format("YYYY-MM");
    if (typeof map[time] === "undefined") {
      map[time] = [item];
    } else {
      map[time].push(item);
    }
  });
  console.log("map", map);

  //   创建新文件夹，按月份分类复制图片
  const newDir = "./origin";
  mkdirSync(`${newDir}`);
  Object.keys(map).forEach((item) => {
    mkdirSync(`${newDir}/${item}`);
    map[item].forEach((file) => {
      copyFileSync(file.path, `${newDir}/${item}/${file.name}`);
    });
  });

  process.exit();
};

export default SplitByMonth;
