import { argv, exit } from 'node:process';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join, parse } from 'node:path';

// Get the argument for the text file directory
// Read the text file directory to get a list of all the files
// Filter out all non-text files
// For each file:
// - Read the contents of the file
// - Remove the offending leading and trailing lines
// - Write the new content to file

function run() {
  const runArgs = argv.slice(2);
  const fileDir = runArgs[0];

  if (!existsSync(fileDir)) {
    console.error(`Error: Unable to locate ${fileDir}`);
    exit(1);
  }

  const allFiles = readdirSync(fileDir);
  const textFiles = allFiles.filter((path) => extname(path) === '.txt');

  for (const fileName of textFiles) {
    const filePath = join(fileDir, fileName);

    if (existsSync(filePath)) {
      const content = readFileSync(filePath, { encoding: 'utf8' });
      const regEx = /\*\*.+\*\*\n/g;
      const replacedContent = content.replace(regEx, '');

      const name = parse(fileName).name;
      const newFileName = `${name}.js`;
      const newFilePath = join(fileDir, newFileName);

      writeFileSync(newFilePath, replacedContent);
    }
  }
}

run();
