import { ref, reactive, onMounted } from 'vue'
import { defineStore } from 'pinia'
import type { Form } from '@/types/aviaForm'

export const useAviaFormStore = defineStore('aviaForm', () => {
  const forms = reactive<Form[]>([])

  const syncFormWithStorage = () => {
    const savedForms = localStorage.getItem('avia-forms')
    if (savedForms) {
      try {
        const parsedForms: Form = JSON.parse(savedForms)
        if (Array.isArray(parsedForms)) {
          forms.splice(0, forms.length, ...parsedForms) // Обновляем массив
        }
      } catch (e: unknown) {
        throw Error(`Ошибка при чтении из localStorage: ${e}`)
      }
    }
  }

  // Записываем содержимое формы
  const submitForm = (idx: number) => {
    const form: Form = forms[idx]
    syncFormWithStorage()
    forms[idx] = form
    localStorage.setItem('avia-forms', JSON.stringify(forms))
  }

  // Добавляем форму в ui для ввода данных
  const addForm = () => {
    forms.push({
      aviaVendorDescription: '',
      availableAviaCompanies: [],
      vendorKey: '',
      companyType: 'close',
      secretKey: null,
    })
  }

  // Удаляем форму
  const removeForm = (idx: number) => {
    // Проверяем, есть ли данные в localStorage
    const savedForms = localStorage.getItem('avia-forms')
    if (savedForms) {
      try {
        const parsedForms = JSON.parse(savedForms)
        if (Array.isArray(parsedForms) && parsedForms[idx]) {
          // Если форма есть в localStorage, удаляем её из parsedForms
          parsedForms.splice(idx, 1)
          // Обновляем localStorage
          localStorage.setItem('avia-forms', JSON.stringify(parsedForms))
        }
      } catch (e: unknown) {
        throw Error(`Ошибка при чтении из localStorage: ${e}`)
      }
    }

    // Удаляем форму из store
    forms.splice(idx, 1)
  }

  // Синхронизация с localStorage при монтировании
  onMounted(() => syncFormWithStorage())

  return { forms, submitForm, addForm, removeForm }
})
