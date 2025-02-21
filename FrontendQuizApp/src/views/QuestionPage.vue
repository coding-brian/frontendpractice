<script setup>
import ItemButton from '@/components/ItemButton.vue'
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { getQuestionByTypeId } from '@/apis/get.js'
import { assignToReactive } from '@/composable/assignToReactive.js'
import itemTypeConfig from '@/constant/itemType.json'
import { useStorage } from '@vueuse/core'
import { useRouter } from 'vue-router'

const storage = useStorage('data', {})
const router = useRouter()
const quesions = ref([])
const question = reactive({
  question: '',
  options: [],
  answer: '',
  itemType: null,
  selectedAnswer: null,
})
const progress = ref(null)
const isError = ref(false)

const nextQuestion = () => {
  setTimeout(() => {
    if (storage.value.question.numberOfQuestion + 1 === quesions.value.length) {
      router.push({ name: 'completion' })
    } else {
      storage.value.question.numberOfQuestion++
      assignToReactive(quesions.value[storage.value.question.numberOfQuestion], question)
    }
  }, 500)
}

const submit = () => {
  if (!question.options.some((item) => item.selected)) {
    isError.value = true
    return
  }
  isError.value = false
  const option = question.options.filter((item) => item.selected)[0]

  if (question.answer === option.name) {
    const option = question.options.filter((item) => item.name === question.answer)[0]
    option.itemType = itemTypeConfig.pickUpCorrectly
    storage.value.numberOfCurrectAnswer++
  }

  if (question.answer !== option.name) {
    question.options.forEach((item) => {
      if (item.name === option.name) {
        item.itemType = itemTypeConfig.incorrect
      }

      if (item.name === question.answer) {
        item.itemType = itemTypeConfig.correct
      }
    })
  }

  nextQuestion()
}

const setSelectedAnswer = (name) => {
  isError.value = false
  question.options.forEach((item) => {
    if (item.name === name) {
      item.selected = true
    } else {
      item.selected = false
    }
  })
}

onMounted(async () => {
  if (storage.value.subject !== null && storage.value.subject !== undefined) {
    quesions.value = await getQuestionByTypeId(storage.value.subject)
    storage.value.question.count = quesions.value.length
    assignToReactive(quesions.value[storage.value.question.numberOfQuestion], question)
  }
})

watchEffect(() => {
  if (progress.value) {
    progress.value.style = `width:${((storage.value.question.numberOfQuestion + 1) / quesions.value.length) * 100}%`
  }
})
</script>

<template>
  <template v-if="question && question.question">
    <div
      class="flex flex-col gap-[40px] mt-8 mx-[32px] lg:flex lg:flex-row lg:justify-between lg:gap-0 lg:mt-[85px] lg:mx-0 md:flex md:flex-col md:gap-[40px] md:mt-[49px] md:mx-0"
    >
      <div class="flex flex-col gap-[32px] lg:flex lg:flex-col lg:justify-between lg:gap-0">
        <div class="max-w-full lg:w-[465px] md:max-w-full">
          <span
            class="text-grey-navy block dark:text-light-bluish body-s text-[14px] italic mb-[12px] lg:body-s lg:mb-[27px] md:body-s md:mb-[27px]"
            >Question {{ storage.question.numberOfQuestion + 1 }} of {{ quesions.length }}</span
          >
          <span
            class="text-dark-navy block dark:text-white heading-m text-[20px] lg:heading-m md:heading-m"
            >{{ question.question }}</span
          >
        </div>
        <div
          class="bg-white w-full rounded-[999px] py-[4px] pl-[4px] h-[16px] dark:bg-navy md:mt-[40px]"
        >
          <div class="bg-purple rounded-[104px] h-[8px]" ref="progress"></div>
        </div>
      </div>
      <ul class="flex flex-col gap-[24px]">
        <ItemButton
          v-for="(option, index) in question.options"
          :key="option.name"
          :option="{
            name: option.name,
            index,
            itemType: option.itemType,
            selected: option.selected,
          }"
          @selectedAnswer="setSelectedAnswer"
        ></ItemButton>
      </ul>
    </div>
    <div
      class="flex mt-[12px] w-[327px] mx-[32px] hover:curser-pointer lg:my-[32px] lg:w-full lg:justify-end lg:mx-0 md:my-[32px] md:w-full md:mx-0"
    >
      <button
        class="w-full h-[56px] bg-purple rounded-[24px] lg:hover:bg-opacity-50 lg:w-[564px] lg:h-[96px] md:h-[96px] md:w-full md:active:bg-opacity-50"
        @click="submit"
      >
        <span class="text-white heading-s text-[18px] lg:heading-s md:heading-s"
          >Submit Answer</span
        >
      </button>
    </div>
    <div class="w-full flex lg:justify-end md:justify-center hover:curser-pointer" v-if="isError">
      <div class="w-[564px] flex justify-center items-center">
        <img src="/images/icon-incorrect.svg" alt="" srcset="" />
        <span class="body-m text-red">Please select an answer</span>
      </div>
    </div>
  </template>
</template>
