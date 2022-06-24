"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const listen = () => {
    const app = express();
    // const url = path.join(__dirname + "/dist");
    // console.log(url);
    app.use(express.static('public'));
    const server = app.listen(3000, () => {
        console.log("listen 3000");
    });
};
exports.default = listen;
