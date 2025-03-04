// This is a workaround for a bug in `ts-node`, which results in an
// `Unknown file extension ".ts"` error when using ES Modules.
// `Ts-node` must be run via NPM script so that this custom loader is invoked.
// E.g., `npm run ts-node <file_path>`.
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('ts-node/esm', pathToFileURL('./'));
