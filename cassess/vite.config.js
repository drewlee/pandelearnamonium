import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = __dirname.split(path.sep).slice(-1)[0];
const ASSETS_DIR = 'assets';
const SCRIPTS_DIR = 'scripts';
const STYLES_DIR = 'styles';
/** @type {Map<string, [string[], number]>} */
const seenChunks = new Map();

/** @type {import('vite').UserConfig} */
export default {
  root: __dirname,
  base: '/pandelearnamonium/cassess/',
  build: {
    rollupOptions: {
      // Targets all HTML files in the application as this is a multi-page app.
      input: globSync('**/*.html').map((filePath) => {
        return path.resolve(__dirname, filePath);
      }),

      output: {
        // Handles the naming and placement of JavaScript static assets. Vite bundles together
        // non-shared JS files and bases the name of the artifact on the name of the HTML file that
        // includes it. E.g., `playground.html` will result with a single `playground.js` file. The
        // most common result is `index.html` with `index.js`. This function collocates the
        // resulting JS artifact with its respective HTML file within its adjacent `scripts`
        // directory. Otherwise, as a default, Vite places all artifacts in the project's root
        // assets` folder. This bundling and naming scheme is also applied to CSS files, but occurs
        // outside of the control of this hook.
        entryFileNames(chunkInfo) {
          console.log(chunkInfo);
          // `facadeModuleId` corresponds to the absolute path of the HTML file being processed.
          const { facadeModuleId } = chunkInfo;
          // Converts the absolute file path to a relative dir path.
          const segments = facadeModuleId.split(path.sep);
          const baseIdx = segments.indexOf(ROOT_DIR);
          const projectPath = segments.slice(baseIdx + 1);
          const dir = path.dirname(projectPath.join(path.sep));
          // Ensure the file is placed into an adjacent `scripts` directory.
          let out = path.join(SCRIPTS_DIR, '[name]-[hash].js');

          if (dir !== '.') {
            out = path.join(dir, out);
          }

          return out;
        },

        // Handles the naming and placement of shared JavaScript static assets. Vite preserves the
        // original name of the file but places it in the project's root `assets` folder. This
        // function preserves the original location of the file.
        chunkFileNames(chunkInfo) {
          // `moduleId` corresponds to the absolute path of the file being processed.
          const moduleId = chunkInfo.moduleIds[0];
          const ext = path.extname(moduleId).slice(1);
          // Converts the absolute file path into a relative dir path.
          const segments = moduleId.split(path.sep);
          const baseIdx = segments.indexOf(ROOT_DIR);
          // While this function also processes shared CSS files, Vite ultimately discards their
          // modification, as they are handled in the `assetFileNames` hook. More on that below.
          // Just as a precaution, this preserves the file's original extension.
          let out = `[name]-[hash].${ext}`;

          // Handles assets injected by Vite. E.g., `modulepreload-polyfill.js`.
          if (baseIdx === -1) {
            return path.join(ASSETS_DIR, out);
          }

          const projectPath = segments.slice(baseIdx + 1);
          const projectPathStr = projectPath.join(path.sep);
          const dir = path.dirname(projectPathStr);

          if (out !== '.') {
            out = path.join(dir, out);
          }

          // The specific CSS assets being processed by this function are those that are shared
          // amongst multiple HTML files. Once they are passed thru the `assetFileNames` hook, they
          // lose their original file path location. To get around this limitation, the file path is
          // stored in a map so it can be referenced later.
          if (ext === 'css') {
            const fileName = projectPath[projectPath.length - 1];
            // `accessCount` is primarily used for lookups of files that share the same name.
            const [pathsForChunk, accessCount] = seenChunks.get(fileName) ?? [[], 0];

            pathsForChunk.push(dir);
            seenChunks.set(fileName, [pathsForChunk, accessCount]);
          }

          return out;
        },

        // Handles the placement and naming of all other types of assets, such as CSS files and
        // images. This function preserves the original location of the file in the project.
        assetFileNames(assetInfo) {
          // `names` corresponds to the file name of the assets.
          // `originalFileNames` corresponds to the relative file path of the assets. In the case
          // of CSS, it refers to the the HTML file that includes the assets. For shared CSS files,
          // it is an empty array.
          const { names, originalFileNames } = assetInfo;
          let out = '[name]-[hash][extname]';

          // An array of multiple entries denotes a non-CSS asset shared by several HTML/CSS files.
          if (names.length > 1) {
            let dir = ASSETS_DIR;

            if (originalFileNames && originalFileNames.length) {
              // Determines whether all the assets reside in the same directory.
              const isSharedDir = originalFileNames.every((fileName, i, origFileNames) => {
                return i === 0 || path.dirname(fileName) === path.dirname(origFileNames[i - 1]);
              });

              // If so, preserve the asset's file location. Otherwise, the assets are actually
              // duplicates and can be placed in the root `assets` directory.
              if (isSharedDir) {
                const origFileName = originalFileNames[0];
                dir = path.dirname(origFileName);
              }
            }

            return path.join(dir, out);
          } else {
            // This conditional block handles an array of single entries.
            const fileName = names[0];
            const ext = path.extname(fileName).slice(1);

            // Handles all other assets and non-shared CSS files.
            if (originalFileNames && originalFileNames.length) {
              const origFileName = originalFileNames[0];
              const dir = path.dirname(origFileName);

              if (ext === 'css') {
                // Preserves the original `styles` directory location.
                out = path.join(STYLES_DIR, out);
              }

              return path.join(dir, out);
            } else {
              // This conditional block handles shared CSS files.
              if (seenChunks.has(fileName)) {
                // Since the file path isn't provided for shared CSS assets, it's derived from a
                // map that is populated during the execution of the `chunkFileNames` hook.
                // The `accessCount` value is used to deal with multiple files that share the same
                // name and the fact that they are processed multiple times by this function.
                const [pathsForChunk, accessCount] = seenChunks.get(fileName);

                if (pathsForChunk) {
                  const chunkPath = pathsForChunk[accessCount];
                  // Access count is increment each time the file is looked up in the map.
                  // It resets to `0` once it exceeds the number of entries in the array.
                  const nAccessCount =
                    accessCount === pathsForChunk.length - 1 ? 0 : accessCount + 1;

                  seenChunks.set(fileName, [pathsForChunk, nAccessCount]);

                  return path.join(chunkPath, out);
                }
              }
            }
          }

          // For all other cases, assets are placed in the root `assets` directory.
          return path.join(ASSETS_DIR, out);
        },
      },
    },
  },
};
