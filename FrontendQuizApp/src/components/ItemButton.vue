<script setup>
import { computed } from 'vue'
import itemTypeConfig from '@/constant/itemType.json'

const props = defineProps({ option: Object, itemType: Number, selectedAnswer: String })
const emit = defineEmits(['selectedAnswer'])

const optionIcon = computed(() => {
  switch (props.option.index) {
    case 0:
      return 'A'
    case 1:
      return 'B'
    case 2:
      return 'C'
    case 3:
      return 'D'
    case 4:
      return 'E'
    case 5:
      return 'F'
    default:
      return 'A'
  }
})

const borderColorClassByitemTypeConfig = computed(() => {
  return {
    'border-green': props.option.itemType === itemTypeConfig.pickUpCorrectly,
    'border-red': props.option.itemType === itemTypeConfig.incorrect,
    'border-[3px]':
      props.option.itemType === itemTypeConfig.pickUpCorrectly ||
      props.option.itemType === itemTypeConfig.incorrect,
  }
})

const bgColorClassByitemTypeConfig = computed(() => {
  switch (props.option.itemType) {
    case itemTypeConfig.pickUpCorrectly:
      return 'bg-green'
    case itemTypeConfig.incorrect:
      return 'bg-red'
    default:
      return 'bg-light-grey'
  }
})

const textColorClassByitemTypeConfig = computed(() => {
  return {
    'text-white':
      props.option.itemType === itemTypeConfig.pickUpCorrectly ||
      props.option.itemType === itemTypeConfig.incorrect,
  }
})

const imageSrcByitemTypeConfig = computed(() => {
  switch (props.option.itemType) {
    case itemTypeConfig.correct:
      return '/images/icon-correct.svg'
    case itemTypeConfig.pickUpCorrectly:
      return '/images/icon-correct.svg'
    case itemTypeConfig.incorrect:
      return '/images/icon-incorrect.svg'
    default:
      return null
  }
})
</script>

<template>
  <button
    class="cursor-pointer flex items-center justify-between bg-white rounded-[24px] focus:border-purple focus:border-[3px] dark:bg-navy w-full p-[12px] lg:w-[564px] lg:p-[20px] md:w-full"
    :class="borderColorClassByitemTypeConfig"
    v-if="props.option"
    @click="emit('selectedAnswer', props.option.name)"
  >
    <div class="flex items-center rounded-[8px]">
      <div
        class="flex justify-center items-center shrink-0 rounded-[8px] w-[40px] h-[40px] mr-4 lg:mr-8 lg:w-[56px] lg:h-[56px] md:mr-8"
        :class="[bgColorClassByitemTypeConfig]"
      >
        <span
          class="text-grey-navy heading-s text-[18px] lg:heading-s md:heading-s"
          :class="textColorClassByitemTypeConfig"
          >{{ optionIcon }}</span
        >
      </div>
      <span
        class="heading-s text-[18px] lg:heading-s md:heading-s text-dark-navy dark:text-white"
        >{{ props.option.name }}</span
      >
    </div>
    <img :src="imageSrcByitemTypeConfig" alt="" srcset="" />
  </button>
</template>

<style scoped>
button:hover div div {
  background-color: theme('colors.magnolia');
}

button:hover div div span {
  color: theme('colors.purple');
}

button:focus div div {
  background-color: theme('colors.purple');
}

button:focus div div span {
  color: white;
}
</style>
