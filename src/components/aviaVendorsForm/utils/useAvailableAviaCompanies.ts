import type { Form } from '@/types/aviaForm'

const useAvailableAviaCompanies = (form: Form) => {
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

  return { changeAvailableAviaCompanies }
}

export default useAvailableAviaCompanies
