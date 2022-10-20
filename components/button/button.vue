<template>
  <button ref="buttonRef" :class="classes" :style="style" :disabled="disabled || loading" :type="htmlType" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useGlobalConfig } from '../hooks';
import { buttonProps } from './type';

export default defineComponent({
  name: 'SeButton',
  props: buttonProps(),
  inheritAttrs: true,
  setup(props, { emit }) {
    const buttonRef = ref<HTMLButtonElement>();

    const { prefix } = useGlobalConfig();

    const prefixCls = `${prefix}-button`;

    const classes = computed(() => {
      const { type, shape = 'default', ghost, size, loading, block, danger } = props;
      return {
        [`${prefixCls}`]: true,
        [`${prefixCls}-${type}`]: !!type,
        [`${prefixCls}-${shape}`]: shape !== 'default' && shape,
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-loading`]: loading,
        [`${prefixCls}-background-ghost`]: ghost,
        [`${prefixCls}-block`]: block,
        [`${prefixCls}-danger`]: !!danger
      };
    });

    const handleClick = (evt: MouseEvent) => {
      emit('click', evt);
    };

    return {
      buttonRef,
      classes,
      handleClick
    };
  }
});
</script>
