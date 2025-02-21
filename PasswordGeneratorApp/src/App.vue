<script setup>
import { computed, isRef, reactive, ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'

const isMobile = useMediaQuery('(max-width: 480px)')
const password = ref('')
const copyResult = ref(false)
const conditionType = {
  uppercase: 0,
  lowercase: 1,
  number: 2,
  symbol: 3,
}
const conditions = [
  {
    type: conditionType.uppercase,
    name: 'Include Uppercase Letters',
    value: conditionType.uppercase,
    charSet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  },
  {
    type: conditionType.lowercase,
    name: 'Include Lowercase Letters',
    value: conditionType.lowercase,
    charSet: 'abcdefghijklmnopqrstuvwxyz',
  },
  {
    type: conditionType.number,
    name: 'Include Numbers',
    value: conditionType.number,
    charSet: '0123456789',
  },
  {
    type: conditionType.symbol,
    name: 'Include Symbols',
    value: conditionType.symbol,
    charSet: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  },
]
const selectedConditions = ref([])
const characterLength = reactive({
  max: 20,
  min: 0,
  value: 0,
})
const range = ref(null)

const strengthFigure = computed(() => {
  if (selectedConditions.value.length < 0) return null
  const result = {
    name: '',
    total: 4,
    count: selectedConditions.value.length,
    remaining: 0,
    class: {
      rectangle: true,
    },
  }

  result.remaining = result.total - result.count
  switch (result.count) {
    case 1:
      result.class['too-week'] = true
      result.name = 'TOO WEAK!'
      break
    case 2:
      result.class['week'] = true
      result.name = 'WEAK'
      break
    case 3:
      result.class['medium'] = true
      result.name = 'MEDIUM'
      break
    case 4:
      result.class['strong'] = true
      result.name = 'STRONG'
      break
  }

  return result
})

const isShowCopied = computed(() => !isMobile.value || password.value.length <= 15)

const rangeHandler = (el) => {
  const percentage = (characterLength.value / characterLength.max) * 100
  el.target.style.background = `linear-gradient(to right, var(--neon-green) ${percentage}%,var(--very-dark-grey) 0%)`
}

const copy = async () => {
  if (password.value) {
    await navigator.clipboard.writeText(password.value)
    copyResult.value = true
    showCopiedAlert()
  }
}

const generate = () => {
  // 檢查是否至少選擇了一個選項
  if (selectedConditions.value.length === 0) {
    throw new Error('必須選擇至少一個字元類型')
  }

  // 如果密碼長度小於選擇的字元類型數量，拋出錯誤
  if (characterLength.value < selectedConditions.value.length) {
    throw new Error('密碼長度必須大於或等於選擇的字元類型數量')
  }

  // 根據選項篩選字元集
  const selectedCharSets = []

  selectedConditions.value.forEach((item) => {
    conditions.filter((condition) => {
      if (condition.type === item) {
        selectedCharSets.push(condition.charSet)
      }
    })
  })
  // 先為每個選擇的字元類型各生成一個字元
  const passwordArray = selectedCharSets.map((set) => set[Math.floor(Math.random() * set.length)])

  // 剩餘的長度用隨機字元填充
  const availableChars = selectedCharSets.join('')

  while (passwordArray.length < characterLength.value) {
    const randomIndex = Math.floor(Math.random() * availableChars.length)
    passwordArray.push(availableChars[randomIndex])
  }

  password.value = passwordArray.sort(() => Math.random() - 0.5).join('')
  copyResult.value = false
  characterLength.value = 0
  selectedConditions.value = []
  range.value.value = characterLength.value
  range.value.dispatchEvent(new Event('input'))
}

const showCopiedAlert = () => {
  if (!isShowCopied.value) {
    alert('Copied!')
  }
}
</script>

<template>
  <main>
    <span class="title heading-m" :class="{ 'font-size-m': isMobile }">Password Generator</span>
    <div class="generator">
      <div class="password-container">
        <span
          class="password"
          :class="{ 'password-copy': copyResult, 'heading-l': !isMobile, 'heading-m': isMobile }"
          >{{ password }}</span
        >
        <div class="copy-container">
          <template v-if="isShowCopied">
            <span class="copy-text body" v-if="copyResult">COPIED</span>
          </template>
          <div class="copy-img" @click="copy"></div>
        </div>
      </div>
      <div class="condition-container">
        <div class="character-length-container">
          <div class="character-length">
            <span class="title body">Character Length</span>
            <span class="number" :class="{ 'heading-l': !isMobile, 'heading-m': isMobile }">{{
              characterLength.value
            }}</span>
          </div>
          <div class="range-container">
            <input
              type="range"
              ref="range"
              :min="characterLength.min"
              :max="characterLength.max"
              v-model.number="characterLength.value"
              @input="rangeHandler"
            />
          </div>
        </div>
        <div class="condition">
          <div class="checkbox-container" v-for="condition in conditions" :key="condition.type">
            <input
              type="checkbox"
              :value="condition.type"
              v-model="selectedConditions"
              :id="condition.type"
            />
            <label
              class="body almost-white"
              :class="{ 'font-size-m': isMobile }"
              :for="condition.type"
              >{{ condition.name }}</label
            >
          </div>
        </div>
        <div class="strength-container">
          <span class="title body" :class="{ 'font-size-m': isMobile }">STRENGTH</span>
          <div class="strength-figure">
            <span
              v-if="strengthFigure"
              class="strength-figure-title"
              :class="{ 'heading-m': !isMobile, body: isMobile }"
              >{{ strengthFigure.name }}</span
            >
            <div class="figure">
              <div
                v-for="(count, index) in strengthFigure.count"
                :class="strengthFigure.class"
                :key="index"
              ></div>
              <div
                v-for="(count, index) in strengthFigure.remaining"
                class="rectangle"
                :key="index"
              ></div>
            </div>
          </div>
        </div>
        <button class="button" @click="generate">
          <span class="text heading-m" :class="{ 'font-size-m': isMobile }">GENERATE</span>
          <div class="arrow-right"></div>
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
