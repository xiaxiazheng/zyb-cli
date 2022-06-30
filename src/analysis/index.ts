import {
  Stats,
  access,
  constants,
  writeFileSync,
  appendFileSync,
  mkdirSync,
  copyFileSync,
} from "fs";
import { resolve as pathResolve } from "path";
import * as dayjs from "dayjs";
import walkDir, { FileType } from "../utils/walkDir";

const isFileExist = (file: string) => {
  return new Promise<boolean>((resolve) => {
    access(file, constants.F_OK, (err) => {
      err ? resolve(false) : resolve(true);
    });
  });
};

const analysis = async () => {
  const reportPath = pathResolve(process.cwd(), "report.csv");
  if (!(await isFileExist(reportPath))) {
    writeFileSync(reportPath, "", "utf-8"); // 新建文件
  }

  // 遍历文件夹，获取所有文件
  const { fileList } = await walkDir({
    handleFile: (obj) => {
      const { stat, name, dir: _dir, path } = obj;
      const time = dayjs(stat.birthtime).format("YYYY-MM-DD HH:mm:ss");
      appendFileSync(reportPath, `${name},${path},${time}\n`);
    },
    filterDirList: [".git", "node_modules", "build"],
  });

  //   console.log("fileList", fileList);

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

  mkdirSync("./origin");
  Object.keys(map).forEach((item) => {
    mkdirSync(`./origin/${item}`);
    map[item].forEach((file) => {
      copyFileSync(file.path, `./origin/${item}/${file.name}`);
    });
  });

  process.exit();
};

export default analysis;
