<script setup>
import { ref, nextTick, computed, reactive } from 'vue'
const buttonType = ref({
  normal: 0,
  custom: 1,
})
const buttons = ref([
  {
    value: 5,
    name: '5%',
    selected: false,
    type: buttonType.value.normal,
  },
  { value: 10, name: '10%', selected: false, type: buttonType.value.normal },
  { value: 15, name: '15%', selected: false, type: buttonType.value.normal },
  { value: 25, name: '25%', selected: false, type: buttonType.value.normal },
  { value: 50, name: '50%', selected: false, type: buttonType.value.normal },
  { value: null, name: 'Custom', selected: false, type: buttonType.value.custom },
])
const bill = ref(null)
const numberOfPeople = reactive({
  value: null,
  isError: false,
})
const tipPercent = ref(0)

const customInput = ref(null)
const amount = ref(0)
const tips = ref(0)

const tipPerson = computed(() => {
  if (numberOfPeople && numberOfPeople.value > 0) {
    const factor = Math.pow(10, 2)
    const result =
      Math.round((tips.value / numberOfPeople.value + Number.EPSILON) * factor) / factor
    return result.toFixed(2)
  } else {
    return '0.00'
  }
})

const amountPerson = computed(() => {
  if (numberOfPeople.value && numberOfPeople.value > 0) {
    const factor = Math.pow(10, 2)
    const result =
      Math.round((amount.value / numberOfPeople.value + Number.EPSILON) * factor) / factor
    return result.toFixed(2)
  } else {
    return '0.00'
  }
})

const calculateTips = () => {
  if (tipPercent.value && numberOfPeople.value && numberOfPeople.value > 0) {
    if (bill.value) tips.value = bill.value * (tipPercent.value / 100)
  } else {
    tips.value = 0
  }
}

const calculateAmount = () =>
  (amount.value = tipPercent.value > 0 ? bill.value * (1 + tipPercent.value / 100) : bill.value)

const calculateResult = () => {
  calculateTips()
  calculateAmount()
}

const handleSelectTip = async (button) => {
  buttons.value.forEach((item) => {
    if (item.value != button.value) {
      item.selected = false
    }
  })

  button.selected = !button.selected
  if (button.selected) {
    copyButtonToSelecTip(button)
  } else {
    tipPercent.value = 0
  }

  if (button.type === buttonType.value.normal) {
    calculateResult()
    const element = buttons.value.filter((item) => item.name === 'Custom')
    element[0].value = null
  }

  if (button.type === buttonType.value.custom) {
    button.selected = true
    await nextTick()

    customInput.value.focus()
  }
}

const inputCustomTipHandler = (event) => {
  tipPercent.value = validateNumber(event.target.value)
  calculateResult()
}

const validateNumber = (value) =>
  value.replace(/\D/g, '') ? parseInt(value.replace(/\D/g, ''), 10) : null

const inputBillHandle = (event) => {
  bill.value = validateNumber(event.target.value)
  calculateResult()
}

const copyButtonToSelecTip = (button) => {
  tipPercent.value = button.value
}

const numberOfPeopleHandler = (event) => {
  numberOfPeople.value = validateNumber(event.target.value)

  if (!numberOfPeople.value) {
    numberOfPeople.isError = true
    return
  }
  numberOfPeople.isError = false
  calculateResult()
  return
}

const blurInputCustomTipHandle = () => {
  if (tipPercent.value === null || tipPercent.value === undefined) {
    buttons.value.forEach((item) => {
      item.selected = false
    })
    calculateResult()
  }
}

const reset = () => {
  bill.value = null

  numberOfPeople.value = null
  numberOfPeople.isError = false

  tipPercent.value = 0

  buttons.value.forEach((item) => {
    item.selected = false
  })
}
</script>

<template>
  <main>
    <div class="image-container">
      <img src="./assets/images/logo.svg" />
    </div>
    <div class="container">
      <div class="calculator">
        <div class="input-field">
          <span class="input-title">Bill</span>
          <div class="input">
            <img src="./assets/images/icon-dollar.svg" />
            <input
              type="text"
              v-model.number="bill"
              @input="inputBillHandle"
              @blur="calculateAmount"
            />
          </div>
        </div>
        <div class="tip">
          <span>Select Tip %</span>
          <div class="select-tip">
            <template v-for="button in buttons" :key="button.name">
              <button
                type="button"
                class="button"
                :class="{ selected: button.selected }"
                v-if="button.type === buttonType.normal"
                :value="button.value"
                @click="handleSelectTip(button)"
              >
                <span> {{ button.name }}</span>
              </button>
              <template v-else>
                <button
                  type="button"
                  class="button"
                  :class="{ selected: button.selected }"
                  :value="button.value"
                  @click="handleSelectTip(button)"
                  v-if="!button.selected"
                >
                  <span> {{ button.name }}</span>
                </button>
                <input
                  :ref="(el) => (customInput = el)"
                  type="text"
                  class="button-input selected"
                  v-model="button.value"
                  v-if="button.selected"
                  @input="inputCustomTipHandler($event)"
                  @blur="blurInputCustomTipHandle"
                />
              </template>
            </template>
          </div>
        </div>
        <div class="input-field">
          <div class="flex justify-content-space-between">
            <span class="input-title">Number of People</span>
            <span class="error-message" v-if="numberOfPeople.isError">Can’t be zero</span>
          </div>
          <div
            class="input"
            :class="{
              error: numberOfPeople.isError,
            }"
          >
            <img src="./assets/images/icon-person.svg" />
            <input type="text" v-model="numberOfPeople.value" @input="numberOfPeopleHandler" />
          </div>
        </div>
      </div>
      <div class="result">
        <div>
          <div class="column">
            <div class="discription">
              <span class="title">Tip Amount</span>
              <span class="unit">/ person</span>
            </div>
            <span>${{ tipPerson }}</span>
          </div>
          <div class="column">
            <div class="discription">
              <span class="title">Total</span>
              <span class="unit">/ person</span>
            </div>

            <span>${{ amountPerson }}</span>
          </div>
        </div>
        <button
          type="button"
          :class="{ disable: parseInt(amountPerson, 10) === 0 && parseInt(tipPerson, 10) === 0 }"
          @click="reset"
        >
          RESET
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
