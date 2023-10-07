import fs from 'fs';
import path from 'path';
import * as process from 'process';

export async function readFile(
  absoluteFilePath: string,
  encoding: BufferEncoding = 'utf8',
): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(absoluteFilePath, (err, data) => {
      if (err) return reject(err);
      return resolve(data.toString(encoding));
    });
  });
}

export function getAbsoluteFilePath(filePath: string) {
  return path.join(process.cwd(), filePath);
}
