import fs from 'fs';
import path from 'path';

export function readCsvFile(filePath: string): any[] {
  const csvContent = fs.readFileSync(path.resolve(filePath), 'utf-8');
  const [headerLine, ...lines] = csvContent.trim().split('\n');
  const headers = headerLine.split(',');

  return lines.map(line => {
    const values = line.split(',');
    return headers.reduce((obj, key, i) => {
      obj[key] = values[i];
      return obj;
    }, {} as Record<string, string>);
  });
}
