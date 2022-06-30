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
    handleFile?: (obj: FileType) => void;
    handleDir?: (obj: FileType) => void;
}
export declare type FileType = {
    name: string;
    dir: string;
    path: string;
    stat: Stats;
};
interface IRes {
    fileList: FileType[];
    folderList: FileType[];
}
declare const walkDir: (params: IParams) => Promise<IRes>;
export default walkDir;
