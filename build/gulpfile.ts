import { mkdir } from 'fs/promises';
import { series, parallel } from 'gulp';

import { run, withTaskName, runTask } from './utils';
import { distDir } from './path';

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(distDir, { recursive: true })),
  parallel(runTask('buildBundle'), runTask('buildFullBundle'), runTask('genTypes'), runTask('buildCss'), runTask('copyFiles'))
);

export * from './task';
