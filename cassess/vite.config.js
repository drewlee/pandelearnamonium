import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = __dirname.split(path.sep).slice(-1)[0];
const ASSETS_DIR = 'assets';
const SCRIPTS_DIR = 'scripts';
const STYLES_DIR = 'styles';
const seenChunks = new Map();

/** @type {import('vite').UserConfig} */
export default {
  root: __dirname,
  base: '/pandelearnamonium/cassess/',
  build: {
    rollupOptions: {
      // Target all HTML files in the application.
      input: globSync('**/*.html').map((filePath) => {
        return path.resolve(__dirname, filePath);
      }),

      output: {
        entryFileNames(chunkInfo) {
          const { facadeModuleId } = chunkInfo;
          const segments = facadeModuleId.split(path.sep);
          const baseIdx = segments.indexOf(ROOT_DIR);
          const projectPath = segments.slice(baseIdx + 1);
          const dir = path.dirname(projectPath.join(path.sep));
          let out = path.join(SCRIPTS_DIR, '[name]-[hash].js');

          if (dir !== '.') {
            out = path.join(dir, out);
          }

          return out;
        },

        chunkFileNames(chunkInfo) {
          const moduleId = chunkInfo.moduleIds[0];
          const ext = path.extname(moduleId).slice(1);
          const segments = moduleId.split(path.sep);
          const baseIdx = segments.indexOf(ROOT_DIR);
          let out = `[name]-[hash].${ext}`;

          if (baseIdx === -1) {
            return path.join(ASSETS_DIR, out);
          }

          const projectPath = segments.slice(baseIdx + 1);
          const projectPathStr = projectPath.join(path.sep);
          const dir = path.dirname(projectPathStr);

          if (out !== '.') {
            out = path.join(dir, out);
          }

          if (ext === 'css') {
            const fileName = projectPath[projectPath.length - 1];
            const [pathsForChunk, accessCount] = seenChunks.get(fileName) ?? [[], 0];

            pathsForChunk.push(dir);
            seenChunks.set(fileName, [pathsForChunk, accessCount]);
          }

          return out;
        },

        assetFileNames(assetInfo) {
          const { names, originalFileNames } = assetInfo;
          let out = '[name]-[hash][extname]';

          if (names.length > 1) {
            if (originalFileNames && originalFileNames.length) {
              const isSharedDir = originalFileNames.every((fileName, i, origFileNames) => {
                return i === 0 || path.dirname(fileName) === path.dirname(origFileNames[i - 1]);
              });

              if (isSharedDir) {
                const origFileName = originalFileNames[0];
                const dir = path.dirname(origFileName);

                return path.join(dir, out);
              }
            }

            return path.join(ASSETS_DIR, out);
          } else {
            const fileName = names[0];
            const ext = path.extname(fileName).slice(1);

            if (originalFileNames && originalFileNames.length) {
              const origFileName = originalFileNames[0];
              const dir = path.dirname(origFileName);

              if (ext === 'css') {
                out = path.join(STYLES_DIR, out);
              }

              return path.join(dir, out);
            } else {
              if (seenChunks.has(fileName)) {
                const [pathsForChunk, accessCount] = seenChunks.get(fileName);

                if (pathsForChunk) {
                  const chunkPath = pathsForChunk[accessCount];
                  const nAccessCount =
                    accessCount === pathsForChunk.length - 1 ? 0 : accessCount + 1;

                  seenChunks.set(fileName, [pathsForChunk, nAccessCount]);

                  return path.join(chunkPath, out);
                }
              }
            }
          }

          return path.join(ASSETS_DIR, out);
        },
      },
    },
  },
};
