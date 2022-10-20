import { defineComponent, renderSlot } from 'vue';
import { provideGlobalConfig } from '../hooks';
import { withInstall } from '../utils';
import { configProviderProps } from './type';

const ConfigProvider = defineComponent({
  name: 'SeConfigProvider',
  props: configProviderProps(),

  setup(props, { slots }) {
    const config = provideGlobalConfig(props);

    return () => renderSlot(slots, 'default', { config: config?.value });
  }
});

export default withInstall(ConfigProvider);
