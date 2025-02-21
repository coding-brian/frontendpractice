<script setup>
import { useStorage } from '@vueuse/core'
import { computed, onMounted, ref, watch } from 'vue'
import { getTypeById } from '@/apis/get.js'
import ToggleButton from '@/components/ToggleButton.vue'
import { useRoute } from 'vue-router'
import { useDark } from '@vueuse/core'

const isDark = useDark()
const storage = useStorage('data', {})
const type = ref(null)
const route = useRoute()

const toggleImages = computed(() => {
  let result = {
    light: '/images/icon-sun-dark.svg',
    dark: '/images/icon-moon-dark.svg',
  }

  if (isDark.value) {
    result = {
      light: '/images/icon-sun-light.svg',
      dark: '/images/icon-moon-light.svg',
    }
  } else {
    result = {
      light: '/images/icon-sun-dark.svg',
      dark: '/images/icon-moon-dark.svg',
    }
  }

  return result
})

const getTypeIconBgClass = (type) => {
  switch (type.iconBgColor) {
    case 'old-lace':
      return 'bg-old-lace'
    case 'light-cyan':
      return 'bg-light-cyan'
    case 'alice-blue':
      return 'bg-alice-blue'
    case 'magnolia':
      return 'bg-magnolia'
  }
}

const chnageType = async () => {
  if (route.name !== 'home') {
    type.value = await getTypeById(storage.value.subject)
  } else {
    type.value = null
  }
}

watch(
  () => route.name,
  async () => {
    await chnageType()
  },
)

onMounted(async () => {
  if (Object.keys(storage.value).length === 0) {
    storage.value = {
      subject: null,
      question: {
        numberOfQuestion: 0,
        count: 0,
      },
      numberOfCurrectAnswer: 0,
    }
  }

  await chnageType()
})
</script>

<template>
  <main class="lg:w-[1160px] md:w-[640px] w-[375px]">
    <header
      class="flex items-center lg:mt-[83px] my-4 mx-[24px] md:mt-[54px] md:mx-0"
      :class="{
        'justify-between': type !== null && type !== undefined,
        'justify-end': !type,
      }"
    >
      <div class="flex items-center" v-if="type">
        <div
          class="flex items-center justify-center w-[40px] h-[40px] mr-4 rounded-[4px] lg:w-[56px] lg:h-[56px] lg:mr-[24px] lg:rounded-[8px] md:w-[56px] md:h-[56px] md:mr-[24px] md:rounded-[8px]"
          :class="getTypeIconBgClass(type)"
        >
          <img
            class="w-[28px] h-[28px] lg:w-auto lg:h-auto md:w-auto md:h-auto"
            :src="'/images/' + type.icon + '.svg'"
            alt=""
          />
        </div>
        <span class="heading-s text-[18px] dark:text-white lg:heading-s md:heading-s">{{
          type.name
        }}</span>
      </div>
      <div class="flex gap-4 items-center">
        <img :src="toggleImages.light" alt="" />
        <ToggleButton></ToggleButton>
        <img :src="toggleImages.dark" alt="" srcset="" />
      </div>
    </header>
    <RouterView />
  </main>
</template>

<style scoped></style>
