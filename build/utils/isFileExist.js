"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const isFileExist = (file) => {
    return new Promise((resolve) => {
        fs_1.access(file, fs_1.constants.F_OK, (err) => {
            err ? resolve(false) : resolve(true);
        });
    });
};
exports.default = isFileExist;
