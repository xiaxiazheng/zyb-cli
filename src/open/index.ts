import { logger, shellExec } from '../utils/index'

function openFile(filePath: string) {
  (async () => {
    logger.waiting(`即将打开文件: `, `'${filePath}'`);
    console.log('filePath', filePath)
    // await open(filePath[0]);
    shellExec(`code ${filePath[0]}`)
    logger.success(`已经打开文件: `, `'${filePath}'`);
  })();
}

export default openFile;
