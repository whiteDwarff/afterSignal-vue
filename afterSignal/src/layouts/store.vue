<template>
  <q-layout view="lHh Lpr lff" class="bg-white">
    SELLER VIEW
    <router-view />
    <LoadingSpinner v-model="isLoadingState" />
  </q-layout>
</template>

<script setup>
const systemStore = useSystemStore();
const { isLoadingState } = storeToRefs(systemStore);
</script>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  layout: store
</route>
