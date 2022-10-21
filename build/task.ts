import { resolve, dirname } from 'path';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { copyFile } from 'fs/promises';
import { src, dest, parallel, series } from 'gulp';
import { sync } from 'fast-glob';
import { InputOptions, OutputOptions, rollup } from 'rollup';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { Project, SourceFile } from 'ts-morph';
import { parse } from '@vue/compiler-sfc';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';

import { componentsDir, distDir, projectDir, tsCacheDir } from './path';
import { buildConfig } from './config';
import { withTaskName, writeBundles } from './utils';

import { version } from '../components/package.publish.json';

const banner = `/*! ${`SeUI`} v${version} */\n`;

async function buildFullEntry(minify: boolean) {
  const plugins = [nodeResolve(), typescript({ cacheRoot: resolve(tsCacheDir, 'all') }), vue(), commonjs()];
  if (minify) {
    plugins.push(terser());
  }
  const config: InputOptions = {
    input: resolve(componentsDir, 'index.ts'),
    plugins,
    external: (id: string) => /^vue/.test(id),
    treeshake: true
  };

  const bundle = await rollup(config);
  await writeBundles(bundle, [
    {
      format: 'umd',
      file: resolve(distDir, 'dist', minify ? 'index.min.js' : 'index.js'),
      exports: 'named',
      name: 'SeUI',
      sourcemap: minify,
      globals: {
        vue: 'Vue'
      },
      banner
    },
    {
      format: 'esm',
      file: resolve(distDir, 'dist', minify ? 'index.min.mjs' : 'index.mjs'),
      sourcemap: minify,
      banner
    }
  ]);
}

const buildFullBundle = parallel(
  withTaskName('buildFull', () => buildFullEntry(false)),
  withTaskName('buildFullMinified', () => buildFullEntry(true))
);

async function buildBundle() {
  const config: InputOptions = {
    input: resolve(componentsDir, 'index.ts'),
    plugins: [nodeResolve(), typescript({ cacheRoot: resolve(tsCacheDir, 'each') }), vue(), commonjs()],
    external: (id: string) => /^vue/.test(id),
    treeshake: false
  };
  const bundle = await rollup(config);
  const options: OutputOptions[] = Object.values(buildConfig).map((config) => ({
    format: config.format,
    dir: config.output.path,
    preserveModules: true,
    preserveModulesRoot: componentsDir,
    exports: ['cjs', 'commonjs'].includes(config.format) ? 'named' : undefined,
    entryFileNames: `[name].js`
  }));

  await Promise.all(options.map((option) => bundle.write(option)));
}

async function genTypes() {
  const project = new Project({
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: true,
      outDir: resolve(distDir, 'types'),
      baseUrl: componentsDir,
      skipLibCheck: true,
      strict: true
    },
    tsConfigFilePath: resolve(projectDir, 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true
  });

  const filePaths = sync('**/*.{vue,ts}', {
    cwd: componentsDir,
    onlyFiles: true,
    absolute: true
  });

  const sourceFiles: SourceFile[] = [];

  await Promise.all(
    filePaths.map(async function (file) {
      if (file.endsWith('.vue')) {
        const content = readFileSync(file, 'utf8');
        const sfc = parse(content);
        const { script } = sfc.descriptor;
        if (script) {
          const content = script.content;
          const sourceFile = project.createSourceFile(file + '.ts', content);
          sourceFiles.push(sourceFile);
        }
      } else {
        const sourceFile = project.addSourceFileAtPath(file);
        sourceFiles.push(sourceFile);
      }
    })
  );

  await project.emit({
    emitOnlyDtsFiles: true
  });

  const tasks = sourceFiles.map(async (sourceFile: any) => {
    const emitOutput = sourceFile.getEmitOutput();
    const tasks = emitOutput.getOutputFiles().map(async (outputFile: any) => {
      const filepath = outputFile.getFilePath();
      mkdirSync(dirname(filepath), {
        recursive: true
      });
      writeFileSync(filepath, outputFile.getText());
    });
    await Promise.all(tasks);
  });

  await Promise.all(tasks);
}

function compileCss() {
  const sass = gulpSass(dartSass);
  const filePath = resolve(componentsDir, '**/{index,base}.scss');
  const outPaths = Object.values(buildConfig).map((item) => dest(item.output.path));
  let compile = src(filePath).pipe(sass.sync()).pipe(cleanCSS());
  outPaths.forEach((item) => {
    compile = compile.pipe(item);
  });
  return compile;
}

function copyFullCss() {
  const filePath = resolve(Object.values(buildConfig)[0].output.path, 'style/index.css');
  return src(filePath).pipe(dest(resolve(distDir, 'dist')));
}

const buildCss = parallel(
  series(
    withTaskName('compileCss', () => compileCss()),
    withTaskName('copyFullCss', () => copyFullCss())
  ),
  withTaskName('copyScss', () => copyScss())
);

function copyScss() {
  const filePath = resolve(componentsDir, '**/*.scss');
  const outPaths = Object.values(buildConfig).map((item) => dest(item.output.path));
  let compile = src(filePath);
  outPaths.forEach((item) => {
    compile = compile.pipe(item);
  });
  return compile;
}

function copyFiles() {
  return Promise.all([
    copyFile(resolve(componentsDir, 'package.publish.json'), resolve(distDir, 'package.json')),
    copyFile(resolve(projectDir, 'README.md'), resolve(distDir, 'README.md'))
  ]);
}

export { buildFullBundle, buildBundle, genTypes, buildCss, copyFiles };
