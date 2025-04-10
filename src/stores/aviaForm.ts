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
  const submitForm = (uid: number) => {
    const idx = forms.findIndex(f => f.uid === uid);
    if (idx === -1) return

    const form: Form = forms[idx]
    syncFormWithStorage()
    forms[idx] = form
    localStorage.setItem('avia-forms', JSON.stringify(forms))
  }

  // Добавляем форму в ui для ввода данных
  const addForm = () => {
    forms.push({
      uid: Date.now(),
      aviaVendorDescription: '',
      availableAviaCompanies: [],
      vendorKey: '',
      companyType: 'close',
      secretKey: null,
    })
  }

  // Удаляем форму
  const removeForm = (uid: number) => {
    // Проверяем, есть ли данные в localStorage
    const savedForms = localStorage.getItem('avia-forms')
    if (savedForms) {
      try {
        const parsedForms: Form[] = JSON.parse(savedForms)
        const idx = parsedForms.findIndex(f => f.uid === uid)
        const isFormExist = idx === -1 ? false : true
        if (Array.isArray(parsedForms) && isFormExist) {
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
    const idx = forms.findIndex(f => f.uid === uid)
    forms.splice(idx, 1)
  }

  // Синхронизация с localStorage при монтировании
  onMounted(() => syncFormWithStorage())

  return { forms, submitForm, addForm, removeForm }
})
