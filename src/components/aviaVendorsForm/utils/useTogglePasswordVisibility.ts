import { ref } from 'vue'

const useTogglePasswordVisibility = () => {
  const showPassword = ref(false)

  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
  }

  return {
    showPassword,
    togglePasswordVisibility,
  }
}

export default useTogglePasswordVisibility
