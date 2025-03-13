import type { Form } from '@/types/aviaForm'

const useCompanyTypes = (form: Form) => {
  const changeCompanyTypes = (event: Event) => {
    const inputValue: string = (event.target as HTMLInputElement)?.value
    if (inputValue !== 'close') form.secretKey = null
  }

  return { changeCompanyTypes }
}

export default useCompanyTypes
