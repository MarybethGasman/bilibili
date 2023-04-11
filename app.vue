<template>
  <Html>

  <Body class="antialiased duration-300 transition-colors text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Body>

  </Html>
</template>

<script lang="ts" setup>

</script>

<style lang="css">
.keep-all {
  word-break: keep-all;
}

.scroll-bar-hidden {}

::-webkit-scrollbar {
  display: none;
}
</style>