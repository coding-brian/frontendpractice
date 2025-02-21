<script setup>
import { useStorage } from '@vueuse/core'
import { getTypeById } from '@/apis/get.js'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const storage = useStorage('data', {})
const type = ref(null)
const router = useRouter()

const playAgain = () => {
  storage.value = {
    subject: null,
    question: {
      numberOfQuestion: 0,
      count: 0,
    },
    numberOfCurrectAnswer: 0,
  }

  router.push({ name: 'home' })
}

onMounted(async () => {
  type.value = await getTypeById(storage.value.subject)
})
</script>

<template>
  <div
    class="flex flex-col mt-8 gap-[40px] px-[24px] lg:flex-row lg:justify-between lg:mt-[85px] lg:px-0 md:gap-[64px] md:mt-[49px] md:px-0"
  >
    <div>
      <span
        class="text-dark-navy block dark:text-white heading-l-regular text-[40px] font-light mb-2 lg:heading-l-regular lg:mb-0 md:heading-l-regular md:mb-0"
        >Quiz completed</span
      >
      <span
        class="text-dark-navy block dark:text-white heading-l-bold text-[40px] lg:heading-l-bold md:heading-l-bold"
        >You scored...</span
      >
    </div>
    <div class="lg:w-[564px] md:w-full">
      <div
        class="flex flex-col items-center justify-between w-full bg-white p-12 rounded-[24px] dark:bg-navy mb-[12px] lg:mb-[32px] md:mb-[32px]"
        v-if="type"
      >
        <div class="flex items-center justify-center mb-[40px]">
          <div
            class="flex items-center justify-center w-[40px] h-[40px] mr-4 rounded-[4px] lg:w-[56px] lg:h-[56px] lg:mr-[24px] lg:rounded-[8px] md:w-[56px] md:h-[56px] md:mr-[24px] md:rounded-[8px]"
            :class="['bg-' + type['iconBgColor']]"
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
        <div class="flex flex-col justify-between">
          <span class="text-dark-navy dark:text-white display text-[88px] lg:display md:display">{{
            storage.numberOfCurrectAnswer
          }}</span>
          <span class="text-grey-navy body-m text-[18px] mt-4 lg:body-m lg:mt-0 md:body-m md:mt-0"
            >out of {{ storage.question.count }}</span
          >
        </div>
      </div>
      <button
        class="w-full h-[96px] bg-purple rounded-[24px] hover:bg-opacity-50"
        @click="playAgain"
      >
        <span class="text-white heading-s">Play Again</span>
      </button>
    </div>
  </div>
</template>
<style scoped></style>
