import { argv, exit } from 'node:process';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { extname, join, parse } from 'node:path';

/**
 * Returns a list of file names in the specified directory.
 *
 * @param fileDir - Directory to scan.
 * @returns An array of file names.
 */
function getFileNames(fileDir: string): string[] {
  let files = [];

  try {
    files = readdirSync(fileDir);
  } catch (error) {
    console.error(error);
    exit(1);
  }

  return files;
}

/**
 * Transforms the specified text content and returns it.
 *
 * @param textContent - Text content to transform.
 * @returns The modified text content.
 */
function transformContent(textContent: string): string {
  const regEx = /^\*\*.+\*\*$/;
  let lines = textContent.split('\n');

  // Remove leading and trailing tags
  lines = lines.filter((line) => !regEx.test(line));

  // Remove leading empty lines
  let i = 0;
  while (lines[i] === '') {
    i++;
  }
  lines = lines.slice(i);

  // Remove trailing empty lines
  i = lines.length - 1;
  while (lines[i] === '') {
    i--;
  }
  lines = lines.slice(0, i + 1);

  const newTextContent = lines.join('\n');

  return newTextContent;
}

/**
 * Reads the contents of the files in the specified array of file names.
 *
 * @param fileNames - An array of file names.
 * @param fileDir - The directory where the files are located.
 * @returns An object of text file content mapped to its respective file name.
 */
function getFileContents(fileNames: string[], fileDir: string): Record<string, string> {
  const fileContents = fileNames.reduce<Record<string, string>>((contents, fileName) => {
    const filePath = join(fileDir, fileName);

    if (existsSync(filePath)) {
      const text = readFileSync(filePath, { encoding: 'utf8' });

      if (contents[fileName] === undefined) {
        contents[fileName] = text;
      }
    }

    return contents;
  }, {});

  return fileContents;
}

/**
 * Transforms the specified text content of the provided input.
 *
 * @param fileContents - File content to modify.
 * @returns An updated object of text file content mapped to their respective file names.
 */
function updateFileContents(fileContents: Record<string, string>): Record<string, string> {
  const newFileContents = Object.entries(fileContents).reduce<Record<string, string>>(
    (contents, [fileName, text]) => {
      const newText = transformContent(text);

      if (contents[fileName] === undefined) {
        contents[fileName] = newText;
      }

      return contents;
    },
    {},
  );

  return newFileContents;
}

/**
 * Writes the given text content to its respective JS file.
 *
 * @param fileContents - The file content to write.
 * @param fileDir - The directory to write to.
 */
function writeFiles(fileContents: Record<string, string>, fileDir: string): void {
  Object.entries(fileContents).forEach(([fileName, text]) => {
    const { name } = parse(fileName);
    const newFileName = `${name}.js`;
    const newFilePath = join(fileDir, newFileName);

    if (!existsSync(newFilePath)) {
      try {
        console.log(`Writing file ${newFilePath}`);
        writeFileSync(newFilePath, text);
      } catch (error) {
        console.error(error);
      }
    }
  });
}

/**
 * The main application entry point and controller.
 */
function run(): void {
  const runArgs = argv.slice(2);
  const fileDir = runArgs[0];

  if (!fileDir) {
    console.error(`Error: directory path not specified`);
    exit(1);
  }

  if (!existsSync(fileDir)) {
    console.error(`Error: Unable to locate ${fileDir}`);
    exit(1);
  }

  const allFiles = getFileNames(fileDir);

  if (!allFiles.length) {
    console.log(`No files found at ${fileDir}`);
  }

  const textFiles = allFiles.filter((path) => extname(path) === '.txt');

  if (!textFiles.length) {
    console.log(`No text files found at ${fileDir}`);
  }

  const textFileContents = getFileContents(textFiles, fileDir);
  const newFileContents = updateFileContents(textFileContents);

  writeFiles(newFileContents, fileDir);

  console.log('All done!');
}

run();
