"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fs_1 = require("fs");
const path_1 = require("path");
const utils_1 = require("../utils");
const listen = () => {
    const app = express();
    const router = express.Router();
    // 调试：curl localhost:3000/api/table
    router.get("/table", (_req, res) => {
        // 读取小文件
        fs_1.readFile(path_1.resolve(__dirname, "../../report.csv"), "utf8", (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            res.send(data.split("\n").filter((item) => item !== ""));
        });
    });
    // “关于页面”路由
    router.get("/about", (_req, res) => {
        res.send("关于此维基");
    });
    app.use("/api", router);
    app.use(express.static("public"));
    const server = app.listen(3000, () => {
        console.log("listen 3000");
    });
    // 在浏览器打开页面
    utils_1.shellExec("open ./public/index.html");
    process.on("SIGTERM", () => {
        // 还是无法退出
        server.close(() => {
            console.log("Process terminated");
        });
    });
    return app;
};
exports.default = listen;
