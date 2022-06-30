import {
  readdir,
  Stats,
  statSync,
  access,
  constants,
  writeFileSync,
  appendFileSync,
} from "fs";
import { resolve as pathResolve } from "path";
import * as dayjs from "dayjs";
import walkDir from "../utils/walkDir";

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
    writeFileSync(reportPath, "", "utf-8");
  }

  const { fileList } = await walkDir({
    handleFile: (stat: Stats, name: string, dir: string, filePath: string) => {
      const time = dayjs(stat.birthtime).format("YYYY-MM-DD HH:mm:ss");
      appendFileSync(reportPath, `${name},${dir},${filePath},${time}\n\t`);
    },
    filterDirList: [".git", "node_modules", "build"],
  });

  console.log("fileList", fileList);

  process.exit();
};

export default analysis;
