<script setup>
import { useRouter } from 'vue-router'
import { getType } from '@/apis/get.js'
import { onMounted, ref } from 'vue'
import { useStorage } from '@vueuse/core'

const router = useRouter()
const types = ref([])
const selectedType = ref(null)
const storage = useStorage('data', {
  subject: null,
  question: {
    numberOfQuestion: 0,
    count: 0,
  },
  numberOfCurrectAnswer: 0,
})

const go = (type) => {
  if (storage.value.subject !== type.id) {
    storage.value.question.numberOfQuestion = 0
    storage.value.numberOfCurrectAnswer = 0
  }
  storage.value.subject = type.id
  selectedType.value = type
  router.push({ name: 'question' })
}

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

onMounted(async () => {
  types.value = await getType()

  if (storage.value && storage.value.subject !== null && storage.value.subject !== undefined) {
    const type = types.value.filter((item) => item.id === storage.value.subject)[0]
    go(type)
  }
})
</script>

<template>
  <div
    class="lg:flex lg:flex-row lg:justify-between lg:items-start lg:mt-[85px] md:mt-[64px] md:flex md:flex-col md:justify-center md:items-start mt-8 flex flex-col gap-[40px] items-center"
  >
    <div>
      <span
        class="heading-l-regular text-[40px] font-light text-dark-navy block dark:text-white lg:heading-l-regular md:heading-l-regular"
        >Welcome to the</span
      >
      <span
        class="heading-l-bold text-[40px] font-medium mt-[8px] lg:heading-l-bold md:heading-l-bold text-dark-navy block dark:text-white"
        >Frontend Quiz!</span
      >
      <span class="body-s text-grey-navy block lg:mt-12 dark:text-light-bluish text-[14px] mt-4"
        >Pick a subject to get started.</span
      >
    </div>
    <ul class="flex flex-col list-none gap-[12px] lg:gap-[24px] lg:mt-0 md:gap-[24px] md:mt-[64px]">
      <li
        v-for="type in types"
        :key="type.id"
        class="w-[327px] h-[64px] cursor-pointer flex items-center p-[20px] bg-white rounded-[24px] lg:w-[564px] lg:h-[96px] md:w-[640px] md:h-[80px] dark:bg-navy"
        @click="go(type)"
      >
        <div
          class="flex items-center justify-center rounded-[8px] w-[40px] h-[40px] mr-4 lg:w-[56px] lg:h-[56px] lg:mr-8 md:w-[56px] md:h-[56px] md:mr-8"
          :class="getTypeIconBgClass(type)"
        >
          <img
            class="w-[28px] h-[28px] lg:w-auto lg:h-auto md:w-auto md:h-auto"
            :src="'/images/' + type.icon + '.svg'"
            alt=""
          />
        </div>
        <span class="dark:text-white heading-s text-[18px] lg:heading-s md:heading-s">{{
          type.name
        }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
