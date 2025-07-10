import * as fs from 'fs';
import * as path from 'path';

/**
 * Writes a JSON object to disk
 * @param relativePath relative path from project root (e.g. "testOutput/myFile.json")
 * @param data any JSON-serializable data
 */
export function writeJsonFile(relativePath: string, data: any): void {
  const filePath = path.resolve(__dirname, '..', relativePath);
  const jsonData = JSON.stringify(data, null, 2); // print with 2-space indentation

  fs.writeFileSync(filePath, jsonData, 'utf-8');
  console.log(`JSON written to: ${filePath}`);
}
