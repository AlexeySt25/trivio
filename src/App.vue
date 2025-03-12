<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'

const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <section class="lg:tw-w-[1200px] tw-w-[90%] tw-mx-auto tw-p-lg tw-flex tw-flex-col tw-gap-lg">
    <header class="tw-flex tw-flex-row tw-justify-between">
      <h1 class="tw-inline tw-font-bold">Управление авиапоставщиками</h1>
      <button class="tw-bg-blue tw-text-white tw-font-medium tw-p-sm tw-rounded-lg" type="button">
        + Добавить
      </button>
    </header>

    <div class="tw-bg-white tw-w-full tw-p-sm tw-rounded-md tw-flex tw-flex-col tw-gap-[50px]">
      <!-- строка с полями ввода -->
      <div
        class="tw-w-full tw-flex tw-flex-col lg:tw-flex-row tw-gap-sm lg:tw-h-[70px] lg:tw-items-center"
      >
        <!-- Поле input: Описание авиапоставщика -->
        <div class="tw-flex tw-flex-col lg:tw-grow">
          <label for="description" class="tw-text-gray tw-text-sm">Описание авиапоставщика</label>
          <input
            id="description"
            type="text"
            placeholder=""
            class="tw-h-[35px] tw-p-sm tw-rounded-lg tw-border tw-bg-whitesmoke tw-outline-none focus:tw-border-blue-500"
          />
        </div>

        <!-- Поле input: Доступные авиакомпании -->
        <div class="tw-flex tw-flex-col lg:tw-grow">
          <label for="availableAirlines" class="tw-text-gray tw-text-sm"
            >Доступные авиакомпании</label
          >
          <input
            id="availableAirlines"
            type="text"
            placeholder=""
            class="tw-h-[35px] tw-p-sm tw-rounded-lg tw-border tw-bg-whitesmoke tw-outline-none focus:tw-border-blue-500"
          />
        </div>

        <!-- Поле input: Ключ поставщика -->
        <div class="tw-flex tw-flex-col lg:tw-grow-2">
          <label for="vendorKey" class="tw-text-gray tw-text-sm">Ключ поставщика</label>
          <input
            id="vendorKey"
            type="text"
            placeholder=""
            class="tw-h-[35px] tw-p-sm tw-rounded-lg tw-border tw-bg-whitesmoke tw-outline-none focus:tw-border-blue-500"
          />
        </div>

        <!-- Поле select: Тип компании -->
        <div class="tw-flex tw-flex-col lg:tw-grow">
          <label for="companyType" class="tw-text-gray tw-text-sm">Тип компании</label>
          <select id="companyType" class="tw-p-sm tw-rounded-lg tw-bg-whitesmoke">
            <option>Закрытая</option>
            <option>Открытая</option>
          </select>
        </div>

        <!-- Поле secret key: Тип компании -->
        <div class="tw-flex tw-flex-col lg:tw-grow-2">
          <label for="companyType" class="tw-text-gray tw-text-sm">Secret Key</label>
          <div
            class="tw-bg-whitesmoke tw-flex tw-rounded-lg tw-flex-row tw-justify-between tw-h-[35px]"
          >
            <input
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
        </div>

        <div class="tw-flex tw-flex-row lg:tw-grow tw-gap-sm">
          <!-- Кнопка Сохранить -->
          <button
            class="tw-grow tw-h-[40px] tw-bg-blue tw-text-white tw-font-medium tw-p-sm tw-rounded-lg tw-shadow-md lg:tw-mt-[20px]"
            type="button"
          >
            Сохранить
          </button>

          <!-- Кнопка удалить -->
          <button
            class="tw-grow-2 tw-bg-red tw-text-white tw-rounded-md tw-p-sm tw-shadow-md lg:tw-mt-[20px]"
            type="button"
          >
            <img width="20px" src="/icons/delete.svg" alt="удалить" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
