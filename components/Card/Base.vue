<script lang="ts" setup>
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
export type IStyles = 'primary' | 'success' | 'warning' | 'danger'

// props
const props = defineProps({
  title: {
    type: String,
    default: undefined,
  },
  desc: {
    type: String,
    default: undefined,
  },
  coverURI: {
    type: String,
    default: undefined,
  },
})

// styles
const styles = reactive<{
  [key: string]: string
}>({
  primary: '',
  success:
    'dark:from-green-500/50 via-gray-200 to-gray-200 dark:via-slate-800 dark:to-slate-800',
  warning:
    'dark:from-yellow-500/50 via-gray-200 to-gray-200 dark:via-slate-800 dark:to-slate-800',
  danger:
    'dark:from-red-500/50 via-gray-200 to-gray-200 dark:via-slate-800 dark:to-slate-800',
})
const textStyles = reactive<{
  [key: string]: string
}>({
  primary: 'text-white',
  success: 'text-green-500',
  warning: 'text-orange-500',
  danger: 'text-red-500',
})

// selected
const isDestroyed = ref<Boolean>(false)

</script>

<template>
  <div>
    <div>
      <img class="w-60 h-36" :src="coverURI" alt="">
    </div>
    <p>{{title}}</p>
  </div>
</template>
