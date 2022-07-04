"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fs_1 = require("fs");
const path_1 = require("path");
const utils_1 = require("../utils");
const isFileExist_1 = require("../utils/isFileExist");
const cors = require("cors");
const listen = async () => {
    const app = express();
    app.use(cors());
    const router = express.Router();
    if (!(await isFileExist_1.default("./report.csv"))) {
        console.log("运行错误，要先运行 zyb analysis 生成 report.csv");
        process.exit();
    }
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
    app.use(express.static("admin-image/build")); // 监听 index.html
    app.use("/static", express.static("static")); // 监听新生成的静态资源目录
    const server = app.listen(3000, () => {
        console.log("listen 3000");
    });
    // 在浏览器打开页面
    utils_1.shellExec("open http://localhost:3000");
    process.on("SIGTERM", () => {
        // 还是无法退出
        server.close(() => {
            console.log("Process terminated");
        });
    });
    return app;
};
exports.default = listen;
