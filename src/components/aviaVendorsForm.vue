<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, helpers, alphaNum, requiredIf } from '@vuelidate/validators'
import { ref, computed, reactive, watch, toRaw } from 'vue'
import errorMessages from '@/components/errorMessages.vue'
import { useAviaFormStore } from '@/stores/aviaForm'
import type { Form } from '@/types/aviaForm'
const aviaFormStore = useAviaFormStore()

type Props = { idx: number; form: Form }
const props = defineProps<Props>()

const showPassword = ref(false)
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const changeAvailableAviaCompanies = (event: Event) => {
  const inputValue: string = (event.target as HTMLInputElement)?.value
  if (inputValue.includes(';')) {
    form.availableAviaCompanies = inputValue.split(';').map((el) => ({
      text: el,
    }))
  } else {
    form.availableAviaCompanies = [{ text: inputValue }]
  }
}

const changeCompanyTypes = (event: Event) => {
  const inputValue: string = (event.target as HTMLInputElement)?.value
  if (inputValue !== 'close') form.secretKey = null
}

const form = props.form

const rules = {
  form: {
    aviaVendorDescription: {
      $autoDirty: true,
      required: helpers.withMessage(() => 'Это поле обязательно для заполнения', required),
      maxLengthValue: helpers.withMessage(() => 'Не более 100 символов', maxLength(100)),
    },
    availableAviaCompanies: {},
    vendorKey: {
      $autoDirty: true,
      required: helpers.withMessage(() => 'Это поле обязательно для заполнения', required),
      maxLengthValue: helpers.withMessage(() => 'Не более 50 символов', maxLength(50)),
    },
    companyType: {},
    secretKey: {
      $autoDirty: true,
      requiredIfFuction: helpers.withMessage(
        () => 'Это поле обязательно для заполнения',
        requiredIf(() => form.companyType === 'close'),
      ),
      alphaNum: helpers.withMessage(() => 'Допускаются только латиница и цифры', alphaNum),
      maxLengthValue: helpers.withMessage(() => 'Не более 50 символов', maxLength(50)),
    },
  },
}

const v$ = useVuelidate(rules, { form })

const submitForm = async () => {
  const isFormValid = await v$.value.$validate()
  aviaFormStore.submitForm(props.idx, form)
  console.log('[submitForm] isFormCorrect ---> ', isFormValid)
  console.log('FORM: ', toRaw(form))
}
</script>

<template>
  <div
    class="tw-w-full tw-flex tw-flex-col lg:tw-flex-row tw-gap-sm lg:tw-min-h-[70px] lg:tw-items-top"
  >
    <!-- Поле input: Описание авиапоставщика -->
    <div class="tw-flex tw-flex-col lg:tw-grow tw-basis-full">
      <label for="description" class="tw-text-gray tw-text-sm">Описание авиапоставщика</label>
      <input
        v-model="form.aviaVendorDescription"
        id="description"
        type="text"
        class="tw-h-[35px] tw-p-sm tw-rounded-lg tw-bg-whitesmoke"
      />

      <error-messages :errors="v$.form.aviaVendorDescription.$errors" />
    </div>

    <!-- Поле input: Доступные авиакомпании -->
    <div class="tw-flex tw-flex-col lg:tw-grow">
      <label for="availableAirlines" class="tw-text-gray tw-text-sm">Доступные авиакомпании</label>
      <input
        :value="form.availableAviaCompanies.map((el) => el.text).join(';')"
        @input="(event) => changeAvailableAviaCompanies(event)"
        id="availableAirlines"
        type="text"
        placeholder=""
        class="tw-h-[35px] tw-p-sm tw-rounded-lg tw-border tw-bg-whitesmoke tw-outline-none focus:tw-border-blue-500"
      />
      <error-messages :errors="v$.form.availableAviaCompanies.$errors" />
    </div>

    <!-- Поле input: Ключ поставщика -->
    <div class="tw-flex tw-flex-col lg:tw-grow-2">
      <label for="vendorKey" class="tw-text-gray tw-text-sm">Ключ поставщика</label>
      <input
        v-model="form.vendorKey"
        id="vendorKey"
        type="text"
        placeholder=""
        class="tw-h-[35px] tw-p-sm tw-rounded-lg tw-border tw-bg-whitesmoke tw-outline-none focus:tw-border-blue-500"
      />
      <error-messages :errors="v$.form.vendorKey.$errors" />
    </div>

    <!-- Поле select: Тип компании -->
    <div class="tw-flex tw-flex-col lg:tw-grow">
      <label for="companyType" class="tw-text-gray tw-text-sm">Тип компании</label>
      <select
        v-model="form.companyType"
        @change="(event) => changeCompanyTypes(event)"
        @blur="v$.form.companyType.$touch()"
        id="companyType"
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
      <label for="companyType" class="tw-text-gray tw-text-sm">Secret Key</label>
      <div
        class="tw-bg-whitesmoke tw-flex tw-rounded-lg tw-flex-row tw-justify-between tw-h-[35px]"
      >
        <input
          v-model="form.secretKey"
          id="secretKey"
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

    <div class="tw-flex tw-flex-row lg:tw-grow tw-gap-sm">
      <!-- Кнопка Сохранить -->
      <button
        @click="submitForm()"
        class="tw-grow tw-h-[40px] tw-bg-blue tw-text-white tw-font-medium tw-p-sm tw-rounded-lg lg:tw-mt-[20px]"
        type="button"
      >
        Сохранить
      </button>

      <!-- Кнопка удалить -->
      <button
        @click="aviaFormStore.removeForm(props.idx)"
        class="tw-flex tw-flex-row tw-justify-center tw-bg-red tw-h-[40px] tw-w-[40px] tw-text-white tw-rounded-md lg:tw-mt-[20px]"
        type="button"
      >
        <img width="20px" src="/icons/delete.svg" alt="удалить" />
      </button>
    </div>
  </div>
</template>
