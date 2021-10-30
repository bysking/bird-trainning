/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/no-explicit-any */

import logger from "logger";

type FileType = any; // 文件类型
type TypeUploadMap = {
  [propName: string]: (
    file: string,
    cb: (ret: boolean) => void | boolean | undefined
  ) => Promise<boolean> | boolean | void;
};

// 根据读取文件
function readFile(path: string): Promise<unknown | any> {
  return new Promise((resolve, reject) => {
    try {
      const data = path; // 读取文件
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}

function getFileType(file: string): string {
  // 获取文件类型，在不同的场景
  return (file.match(/\.(\w+)$/) || [])[1];
}

// 上传类
class UploadController {
  private files: FileType[];
  private uploadedFn: (() => void) | null;

  // 内置上传函数
  private uploadMap: TypeUploadMap = {
    txt: function uploadByFtp(file: string): Promise<boolean> {
      return new Promise((resolve) => {
        file;
        resolve(true);
      });
    },
    exe: function uploadBySftp(file: string, cb: (ret: boolean) => void) {
      return cb(true);
    },
    doc: function uploadByHttp(file: string): boolean {
      file;
      return true;
    },
  };

  constructor(files: FileType[] = []) {
    this.files = files;
    this.uploadedFn = null;
  }

  // 获取文件类型
  private getFileType(file: string) {
    return getFileType(file);
  }

  // 上传
  public upload() {
    const readFilePromiseList = this.files.map((file) => {
      const type = this.getFileType(file);
      const ff = readFile(file);
      return this.uploadByType(type, ff);
    });

    Promise.all(readFilePromiseList)
      .then(() => {
        logger.info("all files upload success.");
        this.uploadedFn && this.uploadedFn();
        return true;
      })
      .catch((err: string) => {
        logger.error("upload fail" + err.toString());
      });
  }

  public uploadByType(type: string, file: any) {
    const uploadFn = this.uploadMap[type];
    if (!uploadFn) {
      logger.error(
        `${type} 在已经注册函数里面'the file uploadFunction is not exist, please register by instance.registerUploadTyle'`
      );
      return;
    }

    if (typeof uploadFn === "function") {
      return uploadFn && uploadFn(type, file);
    }
    logger.warn(`${type} 类型到的文件 ${file.toString}'不存在上传函数`);
  }

  public onUploadLoaed(cb: () => void) {
    if (typeof cb === "function") {
      this.uploadedFn = cb;
    } else {
      logger.warn("`typeof cb` is not match the Function type, please check");
    }
  }
}

// 上传文件列表
let fileList = ["a.txt", "b.exe", "c.doc"];

// 文件类型过滤交给业务处理
fileList = fileList.filter((file = "") => {
  const type = getFileType(file);
  if (type !== "txt" && type !== "exe" && type !== "doc") {
    return false;
  }
  return true;
});

// 实例化再上传
const uploadInstance = new UploadController(fileList);
uploadInstance.upload();
