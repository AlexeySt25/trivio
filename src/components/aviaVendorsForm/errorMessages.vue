<script setup lang="ts">
import type { Ref } from 'vue'

type Props = {
  errors?: Array<{ $uid: string; $message: string | Ref<string> }>
}

const props = withDefaults(defineProps<Props>(), {
  errors: () => [],
})
</script>

<template>
  <div class="tw-text-sm tw-break-words tw-overflow-hidden tw-w-full">
    <p v-for="(error, idx) in props.errors" :key="error.$uid" class="tw-text-red">
      {{ error.$message }}
    </p>
  </div>
</template>
