# zyb-cli
写个命令行工具玩玩

## 开发时
用 npm run watch 打开 typescript 的自动监听文件变动打包即可

## 全局安装命令
npm i @xiaxiazheng/zyb-cli -g
用 yarn 安装的话没有打包后的 dist 文件夹，可能是因为之前没有将 dist 推到源码仓库
yarn add global @xiaxiazheng/zyb-cli

### 开发调试的坑
npm link 和 npm i 本npm包 -g 都会占用 C:\Users\XJY\AppData\Roaming\npm\node_modules 里的 @xiaxiazheng 文件夹，
而且 npm link 是在该文件夹下创建本地项目 zyb-cli 的快捷方式，npm i 的话是直接创建
然鹅这两种方式创建的文件夹名都叫 zyb-cli，所以它们并不能共存。
至于修改 bin 的命令名的方式并不会起作用，因为该命令是创建在 C:\Users\XJY\AppData\Roaming\npm 文件夹下的，只包含 bin 的执行脚本，具体执行还是要去 .\node_modules\@xiaxaizheng 里找 zyb-cli。

所以只能想调试本地的时候用 npm link，想调试已经发布的包就用 npm i -g。
而且用 npm 就好了，用 yarn 的话全局包又装到别的地方去了，更冲突了。

### publish 可能会报错
具体还是在这看看版本就知道有没发上去了
https://www.npmjs.com/package/@xiaxiazheng/zyb-cli

