import { access, constants } from "fs";

const isFileExist = (file: string) => {
  return new Promise<boolean>((resolve) => {
    access(file, constants.F_OK, (err) => {
      err ? resolve(false) : resolve(true);
    });
  });
};

export default isFileExist;
