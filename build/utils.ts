import { spawn } from 'child_process';
import { OutputOptions, RollupBuild } from 'rollup';

import { projectDir } from './path';

export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)));
}

export const run = (command: string, cwd: string = projectDir) => {
  return new Promise<void>((resolve, reject) => {
    const [cmd, ...args] = command.split(' ');
    const app = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });

    const onProcessExit = () => app.kill('SIGHUP');

    app.on('close', (code) => {
      process.removeListener('exit', onProcessExit);
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed. \n Command: ${command} \n Code: ${code}`));
      }
    });

    app.on('exit', () => onProcessExit);
  });
};

export const withTaskName = <T extends Object>(name: string, fn: T) => Object.assign(fn, { displayName: name });

export const runTask = (name: string) => withTaskName(`task: ${name}`, () => run(`pnpm run build ${name}`));
