<script lang="ts">
interface Item {
  id: number,
  pic: string,
  name: string,
}
</script>
<script setup lang="ts">
import { translate } from '@intlify/core-base';


const props = defineProps({
  itemList: {
    type: Array<Item>,
    default: [],
  },
})
let activeIndex = ref(0)

const items = ref()

const transaltexVal = computed(() => 467.2 * activeIndex.value);

</script>

<template>
  <div>
    <div class="h-[75%] relative overflow-hidden">
      <ul class="w-[1000%] flex absolute top-0 transform-gpu transition-all"
        :style="{ transform: `translateX(-${transaltexVal}px)` }">
        <li class="w-[11.111%]" v-for="(item, index) in itemList" :key="item.id" ref="items">
          <img class="w-full" :src="item.pic" alt="">
        </li>
      </ul>
      <div class="w-full h-full bg-[#181628]">
        <div class="absolute bottom-0 left-4 ">
          <span>{{ itemList[activeIndex].name }}</span>
          <ul class="">
            <li class="w-2 h-2 m-1 inline-block rounded-full cursor-pointer" v-for="index in itemList.length"
              :key="index" @click="activeIndex = index - 1"
              :class="{ 'bg-white': activeIndex === index - 1, 'bg-[#ffffff66]': activeIndex !== index - 1 }"></li>
          </ul>
        </div>
        <div class="absolute bottom-0 right-4">
          <button @click="activeIndex = (activeIndex - 1) >= 0 ? (activeIndex - 1) : 0">
            上
          </button>
          <button @click="activeIndex = (activeIndex + 1) % itemList.length">
            下
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
