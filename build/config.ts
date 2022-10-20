import { resolve } from 'path';
import { ModuleFormat } from 'rollup';
import { distDir } from './path';

export type BuildConfig = Record<
  string,
  {
    format: ModuleFormat;
    output: {
      path: string;
    };
  }
>;

export const buildConfig: BuildConfig = {
  esm: {
    format: 'esm',
    output: {
      path: resolve(distDir, 'es')
    }
  },
  cjs: {
    format: 'cjs',
    output: {
      path: resolve(distDir, 'lib')
    }
  }
};
