import { resolve } from 'path';

export const projectDir = resolve(__dirname, '../');
export const componentsDir = resolve(projectDir, 'components');
export const distDir = resolve(projectDir, 'dist');
export const buildDir = resolve(projectDir, 'build');
export const tsCacheDir = resolve(projectDir, 'node_modules/.cache/rollup-plugin-typescript2');
