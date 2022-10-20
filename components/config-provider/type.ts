import { ExtractPropTypes, InjectionKey, PropType, Ref } from 'vue';

export type SizeType = 'small' | 'default' | 'large' | undefined;

export const configProviderContextKey: InjectionKey<Ref<ConfigProviderProps>> = Symbol();

export const configProviderProps = () => ({
  prefix: {
    type: String
  },
  size: {
    type: String as PropType<SizeType>
  }
});

export type ConfigProviderProps = ExtractPropTypes<ReturnType<typeof configProviderProps>>;
