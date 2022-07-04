import { mkdirSync, copyFileSync, appendFileSync, writeFileSync } from "fs";
import * as dayjs from "dayjs";
import { FileType } from "../utils/walkDir";

const SplitByMonth = (fileList: FileType[], reportPath: string) => {
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

  // 覆盖报告文件
  writeFileSync(reportPath, "", "utf-8");

  //   创建新文件夹，按月份分类复制图片
  const newDir = "./static";
  mkdirSync(`${newDir}`);
  Object.keys(map).forEach((item) => {
    mkdirSync(`${newDir}/${item}`);
    map[item].forEach((file) => {
      // 新的静态资源的地址
      const staticPath = `${newDir}/${item}/${file.name}`;

      // 复制文件到新的静态资源文件夹
      copyFileSync(file.path, staticPath);

      // 分好类
      const { stat, name, dir: _dir, path } = file;
      const time = dayjs(stat.birthtime).format("YYYY-MM-DD HH:mm:ss");
      appendFileSync(reportPath, `${name},${staticPath},${path},${time}\n`);
    });
  });

  process.exit();
};

export default SplitByMonth;
