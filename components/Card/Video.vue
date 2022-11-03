<script lang="ts">
interface Video {

}
</script>

<script lang="ts" setup>
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import { number } from '@intlify/core-base';
export type IStyles = 'primary' | 'success' | 'warning' | 'danger'

// props
const props = defineProps({
  title: {
    type: String,
    default: undefined,
  },
  playURI: {
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
  view: {
    type: Number,
    default: 0,
  },
  danmaku: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Number,
    default: null
  },
  ownerName: {
    type: String,
    default: undefined
  },
  date: {
    type: String,
    default: undefined
  },
  videoDuration: {
    type: String,
    default: undefined
  }
})
const date = computed(() => {
  const timestamp = props?.timestamp * 1000
  const date = new Date(timestamp)
  return String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0')
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
    <a class="video" :href="playURI">
      <img class="" :src="coverURI" :alt="title">
      <div class="video__status relative">
        <div
          class="video__status--details bg-gradient-to-b from-transparent to-black px-4 absolute bottom-0 flex justify-between w-full text-white">
          <span class="video__item">
            {{ view > 10000 ? `${(view / 10000).toFixed(1)}万` : view }} : {{ danmaku }}
          </span>

          <span class="">
            {{ Math.floor((duration - 2) / 60) }}:{{ (duration - 2) % 60 }}
            <!-- {{ videoDuration }} -->
          </span>
        </div>
      </div>
      <h3 class="font-semibold">{{ title }}</h3>
      <span>{{ ownerName }}</span> · <span>{{ date }}</span>
    </a>
  </div>
</template>