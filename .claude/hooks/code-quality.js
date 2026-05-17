import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const __dirname = import.meta.dirname;
const root = path.join(__dirname, '..', '..');
const nodeBinPath = path.join(root, 'node_modules', '.bin');

/**
 * Executes Prettier on the modified file.
 *
 * @param {string} filePath - Path of the modified file.
 */
function execPrettier(filePath) {
  const prettier = path.join(nodeBinPath, 'prettier');

  if (!fs.existsSync(prettier)) {
    process.stdout.write('[HOOKS] Unable to find prettier bin file\n');
    return;
  }

  process.stdout.write(`[HOOKS] Running prettier on ${filePath}\n`);

  try {
    const output = execFileSync(prettier, [filePath, '-w'], { encoding: 'utf8' });
    process.stdout.write(output);
  } catch (error) {
    const output = error?.stdout ?? error;
    process.stderr.write(output);
    process.exit(2);
  }
}

/**
 * Executes TSC on the modified file.
 *
 * @param {string} filePath - Path of the modified file.
 */
function execTypeScript(filePath) {
  const tsc = path.join(nodeBinPath, 'tsc');
  const tsExt = new Set(['ts', 'tsx', 'mts', 'cts']);

  if (!fs.existsSync(tsc)) {
    process.stdout.write('[HOOKS] Unable to find tsc bin file\n');
    return;
  }

  let ext = path.parse(filePath).ext;
  ext = ext ? ext.slice(1) : '';

  if (!tsExt.has(ext)) {
    return;
  }

  const tsConfig = 'tsconfig.json';
  let currDir = path.dirname(filePath);

  // Traverse up directories until TS config is found
  while (!fs.existsSync(path.join(currDir, tsConfig))) {
    if (currDir === root) {
      process.stdout.write('[HOOKS] Unable to find associated tsconfig.json\n');
      return;
    }
    currDir = path.join(currDir, '..');
  }

  process.stdout.write(`[HOOKS] Running tsc on ${currDir}\n`);

  try {
    const output = execFileSync(tsc, ['-p', currDir], { encoding: 'utf8' });
    process.stdout.write(output);
  } catch (error) {
    const output = error?.stdout ?? error;
    process.stderr.write(output);
    process.exit(2);
  }
}

/**
 * Executes ESLint on the modified file.
 *
 * @param {string} filePath - Path of the modified file.
 */
function execESLint(filePath) {
  const eslint = path.join(nodeBinPath, 'eslint');
  const eslExt = new Set(['js', 'jsx', 'mjs', 'cjs', 'ts', 'tsx', 'mts', 'cts', 'html']);

  if (!fs.existsSync(eslint)) {
    process.stdout.write('[HOOKS] Unable to find eslint bin file\n');
    return;
  }

  let ext = path.parse(filePath).ext;
  ext = ext ? ext.slice(1) : '';

  if (!eslExt.has(ext)) {
    return;
  }

  const eslConfig = 'eslint.config.js';
  let currDir = path.dirname(filePath);

  // Traverse up directories until ESLint config is found
  while (!fs.existsSync(path.join(currDir, eslConfig))) {
    if (currDir === root) {
      process.stdout.write('[HOOKS] Unable to find associated eslint.config.js\n');
      return;
    }
    currDir = path.join(currDir, '..');
  }

  process.stdout.write(`[HOOKS] Running eslint on ${filePath}\n`);

  try {
    const output = execFileSync(eslint, [filePath], { encoding: 'utf8' });
    process.stdout.write(output);
  } catch (error) {
    const output = error?.stdout ?? error;
    process.stderr.write(output);
    process.exit(2);
  }
}

/**
 * Executes StyleLint on the modified file.
 *
 * @param {string} filePath - Path of the modified file.
 */
function execStyleLint(filePath) {
  const stylelint = path.join(nodeBinPath, 'stylelint');
  const slExt = new Set(['css']);

  if (!fs.existsSync(stylelint)) {
    process.stdout.write('[HOOKS] Unable to find stylelint bin file\n');
    return;
  }

  let ext = path.parse(filePath).ext;
  ext = ext ? ext.slice(1) : '';

  if (!slExt.has(ext)) {
    return;
  }

  const slConfig = 'stylelint.config.js';
  let currDir = path.dirname(filePath);

  // Traverse up directories until StyleLint config is found
  while (!fs.existsSync(path.join(currDir, slConfig))) {
    if (currDir === root) {
      process.stdout.write('[HOOKS] Unable to find associated stylelint.config.js\n');
      return;
    }
    currDir = path.join(currDir, '..');
  }

  process.stdout.write(`[HOOKS] Running stylelint on ${filePath}\n`);

  try {
    const output = execFileSync(stylelint, [filePath], { encoding: 'utf8' });
    process.stdout.write(output);
  } catch (error) {
    const output = error?.stdout ?? error;
    process.stderr.write(output);
    process.exit(2);
  }
}

/**
 * Captures Claude output via stdin and executes the associated code quality
 * checks on the modified file.
 */
async function run() {
  let input = '';
  for await (const chunk of process.stdin) {
    input += chunk;
  }

  const toolArgs = JSON.parse(input);
  const filePath = toolArgs.tool_input?.file_path ?? '';
  process.stdout.write(`[HOOKS] Tool args: ${JSON.stringify(toolArgs, null, 2)}\n`);

  if (!filePath) {
    process.stdout.write(`[HOOKS] File path not found in args\n`);
    process.exit(0);
  }

  execPrettier(filePath);
  execTypeScript(filePath);
  execESLint(filePath);
  execStyleLint(filePath);

  process.exit(0);
}

run();
