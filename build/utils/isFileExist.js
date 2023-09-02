"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const isFileExist = (file) => {
    return new Promise((resolve) => {
        (0, fs_1.access)(file, fs_1.constants.F_OK, (err) => {
            err ? resolve(false) : resolve(true);
        });
    });
};
exports.default = isFileExist;
