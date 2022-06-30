/// <reference types="node" />
/**
 * 递归遍历文件夹下所有的内容
 * params: 要遍历的文件夹，不写默认当前脚本执行文件夹
 */
import { Stats } from "fs";
interface IParams {
    dir?: string;
    filterFileList?: string[];
    filterDirList?: string[];
    handleFile?: (stat: Stats, name: string, dir: string, filePath: string) => void;
    handleDir?: (stat: Stats, name: string, dir: string, filePath: string) => void;
}
interface IRes {
    fileList: string[];
    folderList: string[];
}
declare const walkDir: (params: IParams) => Promise<IRes>;
export default walkDir;
