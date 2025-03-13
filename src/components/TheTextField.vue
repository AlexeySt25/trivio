<template>
  <!-- <v-text-field
    v-model="form.field"
    @update:model-value="(modelValue) => emit('update:modelValue', modelValue)"
    @blur="v$.form.field.$touch()"
    :label="props.label"
    :error-messages="isInvalid ? v$.form.field.$errors.map((err) => err.$message) : ''"
    :error="isInvalid"
    max-errors="5"
    variant="outlined"
    clearable
  /> -->

  <div class="tw-flex tw-flex-col lg:tw-grow">
    <label for="description" class="tw-text-gray tw-text-sm">
      {{ props.label }}
    </label>
    <input
      v-model="form.field"
      @blur="v$.form.field.$touch()"
      id="description"
      type="text"
      class="tw-h-[35px] tw-p-sm tw-rounded-lg tw-bg-whitesmoke"
    />
    <div v-if="isInvalid">
      <p v-for="(error, idx) in v$.form.field.$errors" :key="error.$uid">
        {{ error.$message }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { computed, reactive, watch } from 'vue'

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
  (event: 'invalid', isValid: boolean): void
}>()

interface Props {
  modelValue?: string | null
  label?: string | null
  errorMessage?: string
  require?: boolean
  regex?: RegExp | null
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: null,
  label: '',
  errorMessage: 'некорректное значение',
  require: true,
  regex: null,
})

const fieldRegexValidator = (field: string) => {
  if (props.regex) {
    const validNamePattern = new RegExp(props.regex)
    return !!validNamePattern.test(field)
  }
  return true
}

const fieldRequireValidator = (field: string) => {
  if (props.require) return !!field
  return true
}

const form = reactive({
  field: props.modelValue,
})

// правила валидации
const rules = {
  form: {
    field: {
      required: {
        $validator: fieldRequireValidator,
        $message: 'Это поле обязательно для заполнения',
      },
      name_validation: {
        $validator: fieldRegexValidator,
        $message: props.errorMessage,
      },
    },
  },
}

const v$ = useVuelidate(rules, { form })

// валидность поля
const isInvalid = computed(() => {
  const dirty = v$.value.form.field.$dirty // check if some value has already been entered
  const invalid = v$.value.form.field.$invalid // check entered value validity
  return dirty && invalid
})

// следим за валидностью поля
watch(isInvalid, (newValue) => {
  console.log('watch isInvalid: ', newValue)
  if (newValue) emit('invalid', true)
  else emit('invalid', false)
})
</script>
