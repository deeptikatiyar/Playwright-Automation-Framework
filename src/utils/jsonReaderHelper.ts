import * as fs from 'fs';
import * as path from 'path';

export function readJsonFile<T>(relativePath: string): T {
  const filePath = path.resolve(__dirname, '..', relativePath);
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData) as T;
}
