import { computed } from 'vue'
import { required, maxLength, helpers, alphaNum, requiredIf } from '@vuelidate/validators'
import type { Form } from '@/types/aviaForm'

const useValidationRules = (form: Form) => {
  const rules = computed(() => ({
    form: {
      aviaVendorDescription: {
        $autoDirty: true,
        required: helpers.withMessage(() => 'Это поле обязательно для заполнения', required),
        maxLengthValue: helpers.withMessage(() => 'Не более 15 символов', maxLength(15)),
      },
      availableAviaCompanies: {},
      vendorKey: {
        $autoDirty: true,
        required: helpers.withMessage(() => 'Это поле обязательно для заполнения', required),
        maxLengthValue: helpers.withMessage(() => 'Не более 7 символов', maxLength(7)),
      },
      companyType: {},
      secretKey: {
        $autoDirty: true,
        requiredIfFuction: helpers.withMessage(
          () => 'Это поле обязательно для заполнения',
          requiredIf(() => form.companyType === 'close'),
        ),
        alphaNum: helpers.withMessage(() => 'Допускаются только латиница и цифры', alphaNum),
        maxLengthValue: helpers.withMessage(() => 'Не более 10 символов', maxLength(10)),
      },
    },
  }))

  return { rules }
}

export default useValidationRules
