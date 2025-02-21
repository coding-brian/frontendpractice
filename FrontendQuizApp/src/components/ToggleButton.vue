<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <label class="toggle relative w-12 h-7 inline-block">
    <input class="hidden" type="checkbox" @click="toggleDark()" />
    <span class="slider bg-purple w-full h-full absolute cursor-pointer rounded-[50px]"></span>
  </label>
</template>

<style scoped>
/* 滑塊設置 */
.slider::before {
  content: '';
  position: absolute;
  width: 20px; /* 滑塊的直徑 */
  height: 20px;
  background-color: #ffffff; /* 滑塊顏色 */
  border-radius: 50%; /* 圓形 */
  top: 50%;
  left: 4px; /* 初始位置 */
  transform: translateY(-50%);
  transition: 0.2s; /* 平滑效果 */
}

/* 當 checkbox 被勾選時，滑塊移動 */
.toggle input:checked + .slider::before {
  left: calc(100% - 24px); /*滑動到右邊 */
}
</style>
