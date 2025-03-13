import { ref, reactive, onMounted } from 'vue'
import { defineStore } from 'pinia'
import type { Form } from '@/types/aviaForm'

export const useAviaFormStore = defineStore('aviaForm', () => {
  const forms = reactive<Form[]>([])

  const submitForm = (idx: number, form: Form) => {
    const savedForms = localStorage.getItem('avia-forms')
    if (savedForms) {
      try {
        const parsedForms: Form = JSON.parse(savedForms)
        if (Array.isArray(parsedForms)) {
          forms.splice(0, forms.length, ...parsedForms) // Обновляем массив
        }
        forms[idx] = form
      } catch (e: unknown) {
        throw Error(`Ошибка при чтении из localStorage: ${e}`)
      }
    }

    localStorage.setItem('avia-forms', JSON.stringify(forms))
  }

  const addForm = () => {
    // forms[idx] = form
    // // Сохраняем в localStorage только при вызове submitForm
    forms.push({
      aviaVendorDescription: '',
      availableAviaCompanies: [],
      vendorKey: '',
      companyType: 'close',
      secretKey: null,
    })
  }

  const removeForm = (idx: number) => {
    // Проверяем, есть ли данные в localStorage
    const savedForms = localStorage.getItem('avia-forms')
    if (savedForms) {
      try {
        const parsedForms = JSON.parse(savedForms)
        if (Array.isArray(parsedForms) && parsedForms[idx]) {
          // Если форма есть в localStorage, удаляем её оттуда
          parsedForms.splice(idx, 1)
          // Обновляем localStorage
          localStorage.setItem('avia-forms', JSON.stringify(parsedForms))
        }
      } catch (e) {
        console.error('Ошибка при чтении из localStorage:', e)
      }
    }

    // Удаляем форму из store
    forms.splice(idx, 1)
  }

  // Синхронизация с localStorage при монтировании
  onMounted(() => {
    const savedForms = localStorage.getItem('avia-forms')
    if (savedForms) {
      try {
        const parsedForms: Form = JSON.parse(savedForms)
        if (Array.isArray(parsedForms)) {
          forms.splice(0, forms.length, ...parsedForms) // Обновляем массив
        }
      } catch (e) {
        throw Error(`Ошибка при чтении из localStorage: ${e}`)
      }
    }
  })

  return { forms, submitForm, addForm, removeForm }
})
