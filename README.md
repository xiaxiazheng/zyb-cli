# zyb-cli
写个命令行工具玩玩

## 开发时
用 npm run watch 打开 typescript 的自动监听文件变动打包即可

## 全局安装命令
yarn add global @xiaxiazheng/zyb-cli

### publish 可能会报错
具体还是在这看看版本就知道有没发上去了
https://www.npmjs.com/package/@xiaxiazheng/zyb-cli

### tips:
为了不跟全局命令冲突，开发的时候将 bin 的命令改成 zybtest，publish 的时候改回来
