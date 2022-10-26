<template>
  <se-config-provider>
    <se-button type="link" size="small" @click="onClick">测试</se-button>
  </se-config-provider>
</template>

<script lang="ts" setup>
const onClick = (e: MouseEvent) => {
  console.log(e);
};
</script>
