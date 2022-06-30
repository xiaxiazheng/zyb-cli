/**
 * 递归遍历文件夹下所有的内容
 * params: 要遍历的文件夹，不写默认当前脚本执行文件夹
 */
import { readdir, Stats, statSync } from "fs";
import { resolve as pathResolve } from "path";

interface IParams {
  dir?: string; // 要便利的文件夹路径
  filterFileList?: string[];
  filterDirList?: string[];
  handleFile?: (obj: FileType) => void;
  handleDir?: (obj: FileType) => void;
}

export type FileType = {
  name: string;
  dir: string;
  path: string;
  stat: Stats;
};

interface IRes {
  fileList: FileType[];
  folderList: FileType[];
}

const walkDir = async (params: IParams): Promise<IRes> => {
  const {
    dir = process.cwd(),
    filterFileList = [],
    filterDirList = [],
    handleFile,
    handleDir,
  } = params;
  const curFolderList: string[] = [dir];

  const folderList: FileType[] = [];
  const fileList: FileType[] = [];

  const walk = (dir: string) => {
    return new Promise<void>((resolve, _reject) => {
      readdir(dir, (_err, file) => {
        file.forEach((name) => {
          const filePath = pathResolve(dir, name);
          const stat = statSync(filePath);
          const obj = {
            name,
            dir,
            path: filePath,
            stat,
          };
          // 处理文件
          if (stat.isFile() && !filterFileList.includes(name)) {
            fileList.push(obj);
            handleFile && handleFile(obj);
          }
          if (stat.isDirectory() && !filterDirList.includes(name)) {
            folderList.push(obj);
            handleDir && handleDir(obj);
          }
        });
        resolve();
      });
    });
  };
  while (curFolderList?.length !== 0) {
    const folder = curFolderList.shift();
    if (folder) {
      await walk(folder);
    } else {
      break;
    }
  }

  return {
    fileList,
    folderList,
  };
};

export default walkDir;
