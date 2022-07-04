# zyb-cli

写个命令行工具玩玩

## 开发前的准备

1. 用 npm run watch 打开 typescript 的自动监听文件变动打包即可，bin 里跑的就是 build 的文件夹
2. 把 package.json 里的 zyb 改成别的命令
3. 运行 npm link，就能用新的命令来本地调试了

## 全局安装命令

npm i @xiaxiazheng/zyb-cli -g
用 yarn 安装的话没有打包后的 dist 文件夹，可能是因为之前没有将 dist 推到源码仓库
yarn add global @xiaxiazheng/zyb-cli

### publish 可能会报错

具体还是在这看看版本就知道有没发上去了
https://www.npmjs.com/package/@xiaxiazheng/zyb-cli

#### template 里的 node_modules

虽然 github 仓库里没有这个 node_modules，但是 npm publish 的时候貌似把整个项目带 node_modules 都发布上去了呃
所以导致 zyb init 命令把 template/node_modules 也复制了一遍，所以还是要删掉

#### 关于前端 listen 的项目

在根目录下运行 npm run fe 获取前端项目
