// Workaround for the ts-node `Unknown file extension ".ts"` error with usage of ESM in Node.
// Ts-node must be run via NPM script to invoke this custom loader.
// E.g., `npm run ts-node <file_path>`.
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('ts-node/esm', pathToFileURL('./'));
