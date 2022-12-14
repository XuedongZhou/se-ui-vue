import { isString } from './is';

class SeUIError extends Error {
  constructor(m: string) {
    super(m);
    this.name = 'SeUIError';
  }
}

export function throwError(scope: string, m: string): never {
  throw new SeUIError(`[${scope}] ${m}`);
}

export function debugWarn(err: Error): void;
export function debugWarn(scope: string, message: string): void;
export function debugWarn(scope: string | Error, message?: string): void {
  if (process.env.NODE_ENV !== 'production') {
    const error: SeUIError | Error | string = isString(scope) ? new SeUIError(`[${scope}] ${message}`) : scope;
    console.warn(error);
  }
}
