import * as express from "express";
import * as path from "path";

const listen = () => {
  const app = express();
  // const url = path.join(__dirname + "/dist");
  // console.log(url);

  app.use(express.static("public"));

  const server = app.listen(3000, () => {
    console.log("listen 3000");
  });

  process.on("SIGTERM", () => {
    // 还是无法退出
    server.close(() => {
      console.log("Process terminated");
    });
  });

  return app;
};

export default listen;
