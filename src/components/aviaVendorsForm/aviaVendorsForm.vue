<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { watch } from 'vue'
import {
  useTogglePasswordVisibility,
  useAvailableAviaCompanies,
  useCompanyTypes,
  useValidationRules,
} from '@/components/aviaVendorsForm/utils'
import { errorMessages } from '@/components/aviaVendorsForm'
import type { Form } from '@/types/aviaForm'

type Props = { formIdx: number; modelValue: Form }
type Emit = {
  submitForm: [id: number]
  removeForm: [id: number]
  'update:modelValue': [modelValue: Form]
}
const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const form = props.modelValue
const { showPassword, togglePasswordVisibility } = useTogglePasswordVisibility()
const { changeAvailableAviaCompanies } = useAvailableAviaCompanies(form)
const { changeCompanyTypes } = useCompanyTypes(form)
const { rules } = useValidationRules(form)
const v$ = useVuelidate(rules, { form })

const submitForm = async () => {
  const isFormValid = await v$.value.$validate()
  if (isFormValid) emit('submitForm', props.formIdx)
}

watch(form, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <form
    class="tw-w-full tw-flex tw-flex-col lg:tw-flex-row tw-gap-sm lg:tw-min-h-[70px] lg:tw-items-top"
  >
    <!-- Поле input: Описание авиапоставщика -->
    <div class="tw-flex tw-flex-col lg:tw-grow tw-basis-full">
      <label :for="'description' + props.formIdx" class="tw-text-gray tw-text-sm">Описание авиапоставщика</label>
      <input
        v-model="form.aviaVendorDescription"
        :id="'description' + props.formIdx"
        type="text"
        class="tw-h-[35px] tw-p-sm tw-rounded-lg tw-bg-whitesmoke"
      />

      <error-messages :errors="v$.form.aviaVendorDescription.$errors" />
    </div>

    <!-- Поле input: Доступные авиакомпании -->
    <div class="tw-flex tw-flex-col lg:tw-grow">
      <label :for="'availableAirlines' + props.formIdx" class="tw-text-gray tw-text-sm">Доступные авиакомпании</label>
      <input
        :value="form.availableAviaCompanies.map((el) => el.text).join(';')"
        @input="(event) => changeAvailableAviaCompanies(event)"
        :id="'availableAirlines' + props.formIdx"
        type="text"
        placeholder=""
        class="tw-h-[35px] tw-p-sm tw-rounded-lg tw-border tw-bg-whitesmoke tw-outline-none focus:tw-border-blue-500"
      />
      <error-messages :errors="v$.form.availableAviaCompanies.$errors" />
    </div>

    <!-- Поле input: Ключ поставщика -->
    <div class="tw-flex tw-flex-col lg:tw-grow-2">
      <label :for="'vendorKey' + props.formIdx" class="tw-text-gray tw-text-sm">Ключ поставщика</label>
      <input
        v-model="form.vendorKey"
        :id="'vendorKey' + props.formIdx"
        type="text"
        placeholder=""
        class="tw-h-[35px] tw-p-sm tw-rounded-lg tw-border tw-bg-whitesmoke tw-outline-none focus:tw-border-blue-500"
      />
      <error-messages :errors="v$.form.vendorKey.$errors" />
    </div>

    <!-- Поле select: Тип компании -->
    <div class="tw-flex tw-flex-col lg:tw-grow">
      <label :for="'companyType' + props.formIdx" class="tw-text-gray tw-text-sm">Тип компании</label>
      <select
        v-model="form.companyType"
        @change="(event) => changeCompanyTypes(event)"
        @blur="v$.form.companyType.$touch()"
        :id="'companyType' + props.formIdx"
        class="tw-p-sm tw-rounded-lg tw-bg-whitesmoke"
      >
        <option
          v-for="option in [
            { title: 'Закрытая', value: 'close' },
            { title: 'Открытая', value: 'open' },
          ]"
          :value="option.value"
        >
          {{ option.title }}
        </option>
      </select>
    </div>

    <!-- Поле secret key -->
    <div v-show="form.companyType === 'close'" class="tw-flex tw-flex-col lg:tw-grow-2">
      <label :for="'secretKey' + props.formIdx" class="tw-text-gray tw-text-sm">Secret Key</label>
      <div
        class="tw-bg-whitesmoke tw-flex tw-rounded-lg tw-flex-row tw-justify-between tw-h-[35px]"
      >
        <input
          v-model="form.secretKey"
          :id="'secretKey' + props.formIdx"
          :type="showPassword ? 'text' : 'password'"
          placeholder="****************"
          class="tw-p-sm"
        />
        <button type="button" @click="togglePasswordVisibility()" class="">
          <span v-if="showPassword">👁️</span>
          <span v-else>🙈</span>
        </button>
      </div>
      <error-messages :errors="v$.form.secretKey.$errors" />
    </div>

    <!-- Кнопки -->
    <div class="tw-flex tw-flex-row lg:tw-grow tw-gap-sm">
      <button
        @click="submitForm()"
        class="tw-grow tw-h-[40px] tw-bg-blue tw-text-white tw-font-medium tw-p-sm tw-rounded-lg lg:tw-mt-[20px]"
        type="button"
      >
        Сохранить
      </button>

      <button
        @click="emit('removeForm', props.formIdx)"
        class="tw-flex tw-flex-row tw-justify-center tw-bg-red tw-h-[40px] tw-w-[40px] tw-text-white tw-rounded-md lg:tw-mt-[20px]"
        type="button"
      >
        <img width="20px" src="/icons/delete.svg" alt="удалить" />
      </button>
    </div>
  </form>
</template>
