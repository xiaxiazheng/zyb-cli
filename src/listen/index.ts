import * as express from "express";
import { readFile } from "fs";
import * as path from "path";
import { resolve } from "path";
import { shellExec } from "../utils";
import isFileExist from "../utils/isFileExist";
import * as cors from "cors";

const listen = async () => {
  const app = express();
  app.use(cors());
  const router = express.Router();

  // 这里用的是跑命令的地方的文件，不是用代码里的文件
  const reportPath = resolve(process.cwd(), "./report.csv");
  
  if (!(await isFileExist(reportPath))) {
    console.log("运行错误，要先运行 zyb analysis 生成 report.csv");
    process.exit();
  }

  // 调试：curl localhost:3000/api/table
  router.get("/table", (_req, res) => {
    // 读取小文件
    readFile(reportPath, "utf8", (err, data) => {
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
  
  // 用的是代码所在地的 public
  app.use(express.static(path.resolve(__dirname, "../../public"))); // 监听 index.html
  // 用的是代码执行地的 static
  app.use("/static", express.static("static")); // 监听新生成的静态资源目录

  const server = app.listen(3000, () => {
    console.log("listen 3000");
  });

  // 在浏览器打开页面
  shellExec("open http://localhost:3000");

  process.on("SIGTERM", () => {
    // 还是无法退出
    server.close(() => {
      console.log("Process terminated");
    });
  });

  return app;
};

export default listen;
