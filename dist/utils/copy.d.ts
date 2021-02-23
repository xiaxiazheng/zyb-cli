/// <reference types="node" />
import * as fs from 'fs';
export declare function copyDir(src: fs.PathLike, dist: fs.PathLike): Promise<void>;
export declare function copyFile(_src: fs.PathLike, _dist: fs.PathLike): Promise<void>;
