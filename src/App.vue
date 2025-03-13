<script setup lang="ts">
import aviaVendorsForm from '@/components/aviaVendorsForm.vue'
import { storeToRefs } from 'pinia'
import { useAviaFormStore } from '@/stores/aviaForm'
const aviaFormStore = useAviaFormStore()
const { forms } = storeToRefs(aviaFormStore)
</script>

<template>
  <section class="lg:tw-w-[1200px] tw-w-[100%] lg:tw-mx-auto tw-p-lg tw-flex tw-flex-col tw-gap-lg">
    <header class="tw-flex tw-flex-row tw-justify-between">
      <h1 class="tw-inline tw-text-xl tw-font-bold">Управление авиапоставщиками</h1>
      <button
        @click="aviaFormStore.addForm()"
        class="tw-bg-blue tw-text-white tw-font-medium tw-p-sm tw-rounded-lg"
        type="button"
      >
        + Добавить
      </button>
    </header>

    <div class="tw-bg-white tw-w-full tw-p-sm tw-rounded-md tw-flex tw-flex-col tw-gap-[50px]">
      <h1 v-if="!forms.length" class="tw-text-lg tw-text-center">Поставщики отсутствуют</h1>
      <TransitionGroup name="aviaForm">
        <!-- Компонет формы -->
        <avia-vendors-form v-for="(form, index) in forms" :key="index" :form="form" :idx="index" />
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
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
