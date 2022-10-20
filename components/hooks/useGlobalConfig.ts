import { App, computed, getCurrentInstance, inject, provide, Ref, ref, unref } from 'vue';
import { ConfigProviderProps, configProviderContextKey } from '../config-provider/type';
import { debugWarn } from '../utils/error';

export const keysOf = <T extends Object>(arr: T) => Object.keys(arr) as Array<keyof T>;

const mergeConfig = (a: ConfigProviderProps, b: ConfigProviderProps): ConfigProviderProps => {
  const keys = [...Array.from(new Set([...keysOf(a), ...keysOf(b)]))];
  const obj: Record<string, any> = {};
  for (const key of keys) {
    obj[key] = b[key] ?? a[key];
  }
  return obj;
};

const globalConfig = ref<ConfigProviderProps>({
  prefix: 'se',
  size: 'default'
});

export function useGlobalConfig(): ConfigProviderProps {
  const config = getCurrentInstance() ? inject<Ref<ConfigProviderProps>>(configProviderContextKey, globalConfig) : globalConfig;
  return unref(config);
}

export const provideGlobalConfig = (config: ConfigProviderProps, app?: App, global = false) => {
  const inSetup = !!getCurrentInstance();

  const oldConfig = inSetup ? useGlobalConfig() : undefined;

  const provideFn = app?.provide ?? (inSetup ? provide : undefined);

  if (!provideFn) {
    debugWarn('provideGlobalConfig', 'provideGlobalConfig() can only be used inside setup().');
    return;
  }

  const context = computed(() => {
    const cfg = unref(config);
    if (!oldConfig) {
      return cfg;
    }
    return mergeConfig(oldConfig, cfg);
  });

  provideFn(configProviderContextKey, context);

  if (global || !globalConfig.value) {
    globalConfig.value = context.value;
  }

  return context;
};

export default useGlobalConfig;
