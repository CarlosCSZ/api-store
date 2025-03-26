import * as fs from 'fs';

export function getPkgVersion(): string {
  const pckJson = JSON.parse(
    fs.readFileSync(`${process.cwd()}/package.json`, 'utf-8'),
  );

  return pckJson.version;
}
