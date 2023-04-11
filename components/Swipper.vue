<script lang="ts">
interface Item {
  id: number,
  pic: string,
  name: string,
}
</script>
<script setup lang="ts">
console.log(window)
window.onresize = (e) => {
  refresh();
}
const props = defineProps({
  itemList: {
    type: Array<Item>,
    default: [],
  },
})
let activeIndex = ref(0)

const items = ref()

const refresh = () => {
  items.value[activeIndex.value].scrollIntoView({block: 'nearest', inline: 'nearest', behavior: 'smooth'});
}
watch(activeIndex,async (newIndex: number, oldIndex: number) => {
  items.value[newIndex].scrollIntoView({block: 'nearest', inline: 'nearest', behavior: 'smooth'});
})

</script>

<template>
  <div>
    <div class=" snap-mandatory flex relative">
      
      <div class="flex overflow-scroll">
        <div class="shrink-0 w-full snap-start" v-for="(item, index) in itemList" :key="item.id" ref="items">
          <nuxt-img format="webp" class="" :src="item.pic" loading="lazy" alt="" />
        </div>
      </div>
      <div class="absolute bottom-0 left-4">
        <span>{{ itemList[activeIndex].name }}</span>
        <ul class="">
          <li class="w-2 h-2 m-1 inline-block rounded-full cursor-pointer" v-for="index in itemList.length"
            :key="index" @click="activeIndex = index - 1;refresh()"
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
</template>
