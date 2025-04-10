<script setup lang="ts">
import { aviaVendorsForm } from '@/components/aviaVendorsForm'
import { storeToRefs } from 'pinia'
import { useAviaFormStore } from '@/stores/aviaForm'
const aviaFormStore = useAviaFormStore()
const { forms } = storeToRefs(aviaFormStore)
import type { Form } from '@/types/aviaForm'


const submitForm = async (formIdx: number) => aviaFormStore.submitForm(formIdx)
const removeForm = async (formIdx: number) => aviaFormStore.removeForm(formIdx)
function updateForm(updatedForm: Form) {
  const index = forms.value.findIndex(f => f.uid === updatedForm.uid);
  if (index !== -1) forms.value[index] = updatedForm;
}
</script>

<template>
  <section class="lg:tw-w-[1200px] tw-w-[100%] lg:tw-mx-auto tw-p-lg tw-flex tw-flex-col tw-gap-lg">
    <header class="tw-flex tw-flex-row tw-justify-between">
      <h1 class="tw-inline tw-text-xl tw-font-bold">Управление авиапоставщиками</h1>
      <button
        @click="aviaFormStore.addForm()"
        class="tw-bg-blue tw-text-white tw-font-medium tw-p-sm tw-rounded-lg tw-min-w-[50px]"
        type="button"
      >
        + <span class="tw-hidden lg:tw-inline">Добавить</span>
      </button>
    </header>

    <div class="tw-bg-white tw-w-full tw-p-sm tw-rounded-md tw-flex tw-flex-col tw-gap-[50px]">
      <h1 v-if="!forms.length" class="tw-text-lg tw-text-center">Поставщики отсутствуют</h1>
      <TransitionGroup name="aviaForm">
        <!-- Компонент формы -->
        <avia-vendors-form
          v-for="form in forms"
          :model-value="form"
          @update:model-value="(updatedForm) => updateForm(updatedForm)"
          @submit-form="(formIdx) => submitForm(formIdx)"
          @remove-form="(formIdx) => removeForm(formIdx)"
          :key="form.uid"
          :form-idx="form.uid"
        />
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
/* Стили для анимации TransitionGroup */
.aviaForm-enter-active,
.aviaForm-leave-active {
  transition: all 0.5s ease;
}
.aviaForm-enter-from,
.aviaForm-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
</style>
