import fs from 'fs';
import path from 'path';
import * as process from 'process';

export async function readFile(file: string, encoding: BufferEncoding = 'utf8'): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(file, { encoding }, (err, data) => {
      if (err) return reject(err);
      return resolve(data);
    });
  });
}

export function getAbsoluteFilePath(filePath: string) {
  return path.join(process.cwd(), filePath);
}
